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






export const addUser = async (req, res) => {
  try {
    const { fullname, email, password, confirmPassword, role } = req.body;

    // Verificar si las contraseñas coinciden
    if (password !== confirmPassword) {
      await req.setFlash("error", "Las contraseñas no coinciden.");
      return res.redirect("/usuarios/add");
    }

    // Encriptar la contraseña
    const hashedPassword = await bcrypt.hash(password, 10); // Aquí es donde encriptas

    // Validar si el rol es válido
    if (role !== 'user' && role !== 'admin') {
      await req.setFlash("error", "Rol no válido.");
      return res.redirect("/usuarios/add");
    }

    // Insertar el usuario con la contraseña encriptada
    await pool.query("INSERT INTO users SET ?", [
      {
        fullname,
        email,
        password: hashedPassword, // Guardamos la contraseña encriptada
        role,
      },
    ]);

    await req.setFlash("success", "Usuario guardado exitosamente.");
    res.redirect("/usuarios");
  } catch (error) {
    console.error(error);
    await req.setFlash("error", "Error al guardar el usuario.");
    res.redirect("/usuarios/add");
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
