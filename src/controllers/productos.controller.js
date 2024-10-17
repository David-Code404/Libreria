import { pool } from "../database.js";

// Función para verificar si una categoría existe
const verificarCategoria = async (categoria_id) => {
  const [rows] = await pool.query("SELECT id FROM categorias WHERE id = ?", [
    categoria_id,
  ]);
  return rows.length > 0; // Retorna true si la categoría existe
};

// Función para renderizar el formulario de agregar producto
export const renderAddProducto = async (req, res) => {
  const [categorias] = await pool.query("SELECT * FROM categorias"); // Obtiene las categorías
  res.render("productos/add", { categorias }); // Pasa las categorías a la vista
};

// Función para agregar un producto
export const addProducto = async (req, res) => {
  try {
    const { nombre, descripcion, precio, cantidad, url_imagen, categoria_id } =
      req.body;

    const categoriaExists = await verificarCategoria(categoria_id);
    if (!categoriaExists) {
      await req.setFlash("error", "Categoría no válida.");
      return res.redirect("/productos/add");
    }

    await pool.query("INSERT INTO productos SET ?", [
      {
        nombre,
        descripcion,
        precio,
        cantidad,
        url_imagen,
        categoria_id,
      },
    ]);
    await req.setFlash("success", "Producto Guardado Exitosamente");
    res.redirect("/productos");
  } catch (error) {
    console.error(error);
    await req.setFlash("error", "Error al guardar el producto.");
    res.redirect("/productos/add");
  }
};

// Función para renderizar la lista de productos
export const renderProductos = async (req, res) => {
  const [rows] = await pool.query(`
    SELECT p.*, c.nombre AS categoria_nombre
    FROM productos p
    JOIN categorias c ON p.categoria_id = c.id
  `);
  res.render("productos/list", { productos: rows });
};

// Función para eliminar un producto
export const deleteProducto = async (req, res) => {
  const { id } = req.params;
  await pool.query("DELETE FROM productos WHERE id = ?", [id]);
  await req.setFlash("success", `Producto ${id} Eliminado Exitosamente`);
  return res.redirect("/productos");
};

// Función para renderizar el formulario de edición
export const renderEditProducto = async (req, res) => {
  const { id } = req.params; // Obtener el ID del producto
  try {
    const [producto] = await pool.query(
      "SELECT * FROM productos WHERE id = ?",
      [id]
    );

    if (producto.length === 0) {
      req.setFlash("error", "Producto no encontrado");
      return res.redirect("/productos");
    }

    const [categorias] = await pool.query("SELECT * FROM categorias"); // Obtener categorías para el selector
    res.render("productos/edit", { producto: producto[0], categorias });
  } catch (error) {
    console.error(error);
    req.setFlash("error", "Error al obtener el producto");
    res.redirect("/productos");
  }
};

// Función para actualizar un producto
export const editProducto = async (req, res) => {
  const { id } = req.params; // Obtener el ID del producto
  const { nombre, descripcion, precio, cantidad, url_imagen, categoria_id } =
    req.body;

  try {
    const categoriaExists = await verificarCategoria(categoria_id);
    if (!categoriaExists) {
      await req.setFlash("error", "Categoría no válida.");
      return res.redirect(`/productos/edit/${id}`);
    }

    await pool.query(
      "UPDATE productos SET nombre = ?, descripcion = ?, precio = ?, cantidad = ?, url_imagen = ?, categoria_id = ? WHERE id = ?",
      [nombre, descripcion, precio, cantidad, url_imagen, categoria_id, id]
    );

    await req.setFlash("success", "Producto actualizado exitosamente");
    res.redirect("/productos"); // Redirige a la lista de productos
  } catch (error) {
    console.error(error);
    await req.setFlash("error", "Error al actualizar el producto.");
    res.redirect(`/productos/edit/${id}`); // Redirige de nuevo al formulario de edición en caso de error
  }
};
