import { pool } from "../database.js";

// Función para verificar si el usuario es administrador
const isAdmin = (req) => req.user && req.user.role === "admin";

// Renderiza la lista de usuarios (solo para administradores)
export const renderUsers = async (req, res) => {
  if (!isAdmin(req)) {
    return res.redirect("/"); // Redirige si no es admin
  }

  try {
    const [usuarios] = await pool.query("SELECT * FROM users WHERE role != 'admin'");
    res.render("usuarios/list", { usuarios });
  } catch (error) {
    console.error(error);
    res.redirect("/");
  }
};

// Renderiza el formulario para agregar un nuevo usuario (solo para administradores)
export const renderAddUser = (req, res) => {
  if (!isAdmin(req)) {
    return res.redirect("/"); // Redirige si no es admin
  }
  res.render("usuarios/add");
};

// Agrega un nuevo usuario (solo para administradores)
export const addUser = async (req, res, next) => {
  if (!isAdmin(req)) {
    return res.redirect("/"); // Redirige si no es admin
  }

  const { fullname, email, password1, role } = req.body;

  const password = await encryptPassword(password1);

  try {
    const [result] = await pool.query("INSERT INTO users SET ?", {
      fullname,
      email,
      password,
      role: role || "user", // Asigna el rol 'user' por defecto si no se seleccionó
    });

    res.redirect("/usuarios");
  } catch (error) {
    console.error("Error al crear usuario:", error);
    res.redirect("/usuarios");
  }
};

// Elimina un usuario (solo para administradores)
export const deleteUser = async (req, res) => {
  if (!isAdmin(req)) {
    return res.redirect("/"); // Redirige si no es admin
  }

  const { id } = req.params;
  try {
    const result = await pool.query("DELETE FROM users WHERE id = ?", [id]);

    if (result.affectedRows === 0) {
      return res.redirect("/usuarios");
    }

    res.redirect("/usuarios");
  } catch (error) {
    console.error(error);
    res.redirect("/usuarios");
  }
};

// Renderiza el formulario para editar un usuario (solo para administradores)
export const renderEditUser = async (req, res) => {
  if (!isAdmin(req)) {
    return res.redirect("/"); // Redirige si no es admin
  }

  const { id } = req.params;
  try {
    const [usuario] = await pool.query("SELECT * FROM users WHERE id = ?", [id]);

    if (!usuario.length) {
      return res.redirect("/usuarios");
    }

    res.render("usuarios/edit", { usuario: usuario[0] });
  } catch (error) {
    console.error(error);
    res.redirect("/usuarios");
  }
};

// Actualiza un usuario (solo para administradores)
export const editUser = async (req, res) => {
  if (!isAdmin(req)) {
    return res.redirect("/"); // Redirige si no es admin
  }

  const { id } = req.params;
  const { fullname, email, password, role } = req.body;
  try {
    await pool.query("UPDATE users SET fullname = ?, email = ?, password = ?, role = ? WHERE id = ?", [fullname, email, password, role, id]);
    res.redirect("/usuarios");
  } catch (error) {
    console.error(error);
    res.redirect("/usuarios");
  }
};
