import { pool } from "../database.js";

// Verifica si el usuario es administrador
const checkAdminRole = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    return next(); // El usuario es admin, puede proceder
  }
  req.setFlash("error", "No tienes permisos para acceder a esta sección.");
  res.redirect("/"); // Redirige al usuario a una página segura si no es admin
};

// Función para verificar si una categoría existe
const verificarCategoria = async (categoria_id) => {
  const [rows] = await pool.query("SELECT id FROM categorias WHERE id = ?", [
    categoria_id,
  ]);
  return rows.length > 0; // Retorna true si la categoría existe
};

// Renderiza la lista de productos (solo admin puede ver más detalles)
export const renderProductos = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      const [productos] = await pool.query(`
        SELECT p.id, p.nombre, p.descripcion, p.precio, p.cantidad, p.url_imagen, c.nombre AS categoria_nombre
        FROM productos p
        JOIN categorias c ON p.categoria_id = c.id
      `);
      res.render("productos/list", { productos }); // Vista solo para mostrar productos al usuario
    } else {
      // Admin puede ver todo, productos completos
      const [productos] = await pool.query(`
        SELECT p.*, c.nombre AS categoria_nombre
        FROM productos p
        JOIN categorias c ON p.categoria_id = c.id
      `);
      res.render("productos/list", { productos }); // Vista con más detalles para admins
    }
  } catch (error) {
    console.error(error);
    req.setFlash("error", "Error al obtener los productos");
    res.redirect("/productos");
  }
};

// Renderiza el formulario de agregar producto (solo admin)
export const renderAddProducto = async (req, res) => {
  if (req.user.role !== "admin") {
    req.setFlash("error", "No tienes permisos para agregar productos.");
    return res.redirect("/productos"); // Redirige si no es admin
  }

  const [categorias] = await pool.query("SELECT * FROM categorias"); // Obtiene las categorías
  res.render("productos/add", { categorias }); // Pasa las categorías a la vista
};

// Agrega un nuevo producto (solo admin)
export const addProducto = async (req, res) => {
  if (req.user.role !== "admin") {
    req.setFlash("error", "No tienes permisos para agregar productos.");
    return res.redirect("/productos"); // Redirige si no es admin
  }

  try {
    const { nombre, descripcion, precio, cantidad, url_imagen, categoria_id } = req.body;

    const categoriaExists = await verificarCategoria(categoria_id);
    if (!categoriaExists) {
      req.setFlash("error", "Categoría no válida.");
      return res.redirect("/productos/add");
    }

    await pool.query("INSERT INTO productos SET ?", [
      { nombre, descripcion, precio, cantidad, url_imagen, categoria_id },
    ]);
    req.setFlash("success", "Producto Guardado Exitosamente");
    res.redirect("/productos");
  } catch (error) {
    console.error(error);
    req.setFlash("error", "Error al guardar el producto.");
    res.redirect("/productos/add");
  }
};

// Elimina un producto (solo admin)
export const deleteProducto = async (req, res) => {
  const { id } = req.params;
  if (req.user.role !== "admin") {
    req.setFlash("error", "No tienes permisos para eliminar productos.");
    return res.redirect("/productos"); // Redirige si no es admin
  }

  try {
    await pool.query("DELETE FROM productos WHERE id = ?", [id]);
    req.setFlash("success", `Producto ${id} Eliminado Exitosamente`);
    return res.redirect("/productos");
  } catch (error) {
    console.error(error);
    req.setFlash("error", "Error al eliminar el producto");
    res.redirect("/productos");
  }
};

// Renderiza el formulario de edición de producto (solo admin)
export const renderEditProducto = async (req, res) => {
  const { id } = req.params; // Obtiene el ID del producto desde la URL
  if (req.user.role !== "admin") {
    req.setFlash("error", "No tienes permisos para editar productos.");
    return res.redirect("/productos"); // Redirige si no es admin
  }

  try {
    // Consulta el producto de la base de datos
    const [producto] = await pool.query("SELECT * FROM productos WHERE id = ?", [id]);

    if (producto.length === 0) {
      req.setFlash("error", "Producto no encontrado");
      return res.redirect("/productos");
    }

    // Obtiene las categorías para el selector de categorías en la vista
    const [categorias] = await pool.query("SELECT * FROM categorias");
    // Renderiza la vista de edición, pasando los datos del producto y las categorías
    res.render("productos/edit", { producto: producto[0], categorias });
  } catch (error) {
    console.error(error);
    req.setFlash("error", "Error al obtener el producto");
    return res.redirect("/productos");
  }
};

// Actualiza un producto (solo admin)
export const editProducto = async (req, res) => {
  const { id } = req.params; // Obtener el ID del producto
  const { nombre, descripcion, precio, cantidad, url_imagen, categoria_id } = req.body;

  if (req.user.role !== "admin") {
    req.setFlash("error", "No tienes permisos para editar productos.");
    return res.redirect("/productos"); // Redirige si no es admin
  }

  try {
    const categoriaExists = await verificarCategoria(categoria_id);
    if (!categoriaExists) {
      req.setFlash("error", "Categoría no válida.");
      return res.redirect(`/productos/edit/${id}`);
    }

    await pool.query(
      "UPDATE productos SET nombre = ?, descripcion = ?, precio = ?, cantidad = ?, url_imagen = ?, categoria_id = ? WHERE id = ?",
      [nombre, descripcion, precio, cantidad, url_imagen, categoria_id, id]
    );

    req.setFlash("success", "Producto actualizado exitosamente");
    return res.redirect("/productos"); // Redirige a la lista de productos
  } catch (error) {
    console.error(error);
    req.setFlash("error", "Error al actualizar el producto.");
    return res.redirect(`/productos/edit/${id}`); // Redirige al formulario de edición si hay un error
  }
};
