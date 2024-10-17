import { pool } from "../database.js";

// Función para renderizar el formulario de agregar producto
export const renderAddProducto = (req, res) => res.render("productos/add");

// Función para agregar un producto
export const addProducto = async (req, res) => {
  const { nombre, descripcion, precio, cantidad, url_imagen, categoria_id } = req.body;
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
};

// Función para renderizar la lista de productos
export const renderProductos = async (req, res) => {
  const [rows] = await pool.query("SELECT * FROM productos"); // Eliminada la referencia a user_id
  res.render("productos/list", { productos: rows });
};

// Función para eliminar un producto
export const deleteProducto = async (req, res) => {
  const { id } = req.params;
  await pool.query("DELETE FROM productos WHERE id = ?", [id]);
  await req.setFlash("success", `Producto ${id} Eliminado Exitosamente`);
  return res.redirect("/productos");
};

// Función para renderizar el formulario de edición de un producto
export const renderEditProducto = async (req, res) => {
  const { id } = req.params;
  const [rows] = await pool.query("SELECT * FROM productos WHERE id = ?", [id]);
  res.render("productos/edit", { producto: rows[0] });
};

// Función para editar un producto
export const editProducto = async (req, res) => {
  const { id } = req.params;
  const { nombre, descripcion, precio, cantidad, url_imagen} = req.body;
  const newProduct = {
    nombre,
    descripcion,
    precio,
    cantidad,
    url_imagen,

  };
  await pool.query("UPDATE productos SET ? WHERE id = ?", [newProduct, id]);
  await req.setFlash("success", "Producto Actualizado Exitosamente");
  res.redirect("/productos");
};
