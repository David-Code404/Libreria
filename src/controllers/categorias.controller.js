import { pool } from "../database.js";

// Verifica que el usuario sea administrador
const checkAdminRole = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    return next(); // El usuario es admin, puede proceder
  }
  req.setFlash("error", "No tienes permisos para acceder a esta sección.");
  res.redirect("/"); // Redirige al usuario a una página segura si no es admin
};

// Renderiza la lista de categorías (solo admin)
export const renderCategories = async (req, res) => {
  try {
    // Verifica si el usuario es admin antes de permitirle ver las categorías
    if (req.user.role !== "admin") {
      req.setFlash("error", "No tienes acceso a la lista de categorías.");
      return res.redirect("/"); // Redirige a inicio si el usuario no es admin
    }

    const [categorias] = await pool.query("SELECT * FROM categorias");
    res.render("categorias/list", { categorias });
  } catch (error) {
    console.error(error);
    req.setFlash("error", "Error al obtener las categorías");
    res.redirect("/categorias");
  }
};

// Renderiza el formulario para agregar una categoría (solo admin)
export const renderAddCategory = (req, res) => {
  if (req.user.role !== "admin") {
    req.setFlash("error", "No tienes permisos para agregar categorías.");
    return res.redirect("/"); // Redirige si no es admin
  }
  res.render("categorias/add");
};

// Agrega una nueva categoría (solo admin)
export const addCategory = async (req, res) => {
  const { nombre, descripcion, url_imagen } = req.body;
  if (req.user.role !== "admin") {
    req.setFlash("error", "No tienes permisos para agregar categorías.");
    return res.redirect("/"); // Redirige si no es admin
  }
  
  try {
    await pool.query("INSERT INTO categorias (nombre, descripcion, url_imagen) VALUES (?, ?, ?)", [nombre, descripcion, url_imagen]);
    req.setFlash("success", "Categoría agregada exitosamente");
    res.redirect("/categorias");
  } catch (error) {
    console.error(error);
    req.setFlash("error", "Error al agregar la categoría");
    res.redirect("/categorias/add");
  }
};

// Elimina una categoría (solo admin)
export const deleteCategory = async (req, res) => {
  const { id } = req.params;
  if (req.user.role !== "admin") {
    req.setFlash("error", "No tienes permisos para eliminar categorías.");
    return res.redirect("/"); // Redirige si no es admin
  }
  
  try {
    await pool.query("DELETE FROM categorias WHERE id = ?", [id]);
    req.setFlash("success", "Categoría eliminada exitosamente");
    res.redirect("/categorias");
  } catch (error) {
    console.error(error);
    req.setFlash("error", "Error al eliminar la categoría");
    res.redirect("/categorias");
  }
};

// Renderiza el formulario para editar una categoría (solo admin)
export const renderEditCategory = async (req, res) => {
  const { id } = req.params;
  
  if (req.user.role !== "admin") {
    req.setFlash("error", "No tienes permisos para editar categorías.");
    return res.redirect("/"); // Redirige si no es admin
  }

  const [categoria] = await pool.query("SELECT * FROM categorias WHERE id = ?", [id]);
  
  if (categoria.length === 0) {
    req.setFlash("error", "Categoría no encontrada");
    return res.redirect("/categorias");
  }
  
  res.render("categorias/edit", { categoria: categoria[0] });
};

// Actualiza una categoría (solo admin)
export const editCategory = async (req, res) => {
  const { id } = req.params;
  const { nombre, descripcion, url_imagen } = req.body;
  
  if (req.user.role !== "admin") {
    req.setFlash("error", "No tienes permisos para editar categorías.");
    return res.redirect("/"); // Redirige si no es admin
  }

  try {
    await pool.query("UPDATE categorias SET nombre = ?, descripcion = ?, url_imagen = ? WHERE id = ?", [nombre, descripcion, url_imagen, id]);
    req.setFlash("success", "Categoría actualizada exitosamente");
    res.redirect("/categorias");
  } catch (error) {
    console.error(error);
    req.setFlash("error", "Error al actualizar la categoría");
    res.redirect(`/categorias/edit/${id}`);
  }
};
