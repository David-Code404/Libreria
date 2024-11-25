import { pool } from "../database.js";

// Renderiza la lista de usuarios (solo los que no son admin)
export const renderUsers = async (req, res) => {
  try {
    const [usuarios] = await pool.query("SELECT * FROM users WHERE role != 'admin'");
    res.render("usuarios/list", { usuarios });
  } catch (error) {
    console.error(error);
    req.flash("error", "Error al obtener los usuarios");
    res.redirect("/usuarios");
  }
};

// Renderiza el formulario para agregar un nuevo usuario
export const renderAddUser = (req, res) => {
  res.render("usuarios/add");
};

// Agrega un nuevo usuario


export const addUser = async (req, res, next) => {
  const { fullname, email, password1, role } = req.body; // Capturamos el rol del formulario

  const password = await encryptPassword(password1);

  try {
    // Guardando en la base de datos
    const [result] = await pool.query("INSERT INTO users SET ?", {
      fullname,
      email,
      password,
      role: role || "user", // Asignamos el rol 'user' por defecto si no se seleccionó
    });

    req.login(
      {
        id: result.insertId,
        fullname,
        email,
        role: role || "user", // También añadimos el rol a la sesión
      },
      (err) => {
        if (err) {
          return next(err);
        }
        return res.redirect("/productos"); // Redirigimos a productos o la ruta correspondiente
      }
    );
  } catch (error) {
    // Manejo de errores
    console.error("Error al crear usuario:", error);
    req.flash("error", "Error al crear usuario, intente de nuevo.");
    res.redirect("/usuarios");
  }
};







// Elimina un usuario
export const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    // Eliminar el usuario directamente sin verificar dos veces
    const result = await pool.query("DELETE FROM users WHERE id = ?", [id]);
    
    if (result.affectedRows === 0) {
      req.flash("error", "Usuario no encontrado");
      return res.redirect("/usuarios");
    }

    req.flash("success", "Usuario eliminado exitosamente");
    res.redirect("/usuarios");
  } catch (error) {
    console.error(error);
    res.redirect("/usuarios");
  }
};

// Renderiza el formulario para editar un usuario
export const renderEditUser = async (req, res) => {
  const { id } = req.params;
  try {
    const [usuario] = await pool.query("SELECT * FROM users WHERE id = ?", [id]);

    if (!usuario.length) {
      req.flash("error", "Usuario no encontrado");
      return res.redirect("/usuarios");
    }

    res.render("usuarios/edit", { usuario: usuario[0] });
  } catch (error) {
    console.error(error);
    
    res.redirect("/usuarios");
  }
};

// Actualiza un usuario
export const editUser = async (req, res) => {
  const { id } = req.params;
  const { fullname, email, password, role } = req.body;
  try {
    await pool.query("UPDATE users SET fullname = ?, email = ?, password = ?, role = ? WHERE id = ?", [fullname, email, password, role, id]);
    req.flash("success", "Usuario actualizado exitosamente");
    res.redirect("/usuarios");
  } catch (error) {
    console.error(error);
    
    res.redirect(`/usuarios`);
  }
};
