import { pool } from "../database.js";

// Renderiza la lista de productos en el carrito
export const renderCarrito = async (req, res) => {
  try {
    const [carrito] = await pool.query("SELECT * FROM carrito");
    res.render("carrito/list", { carrito });
  } catch (error) {
    console.error(error);
    req.setFlash("error", "Error al obtener los productos en el carrito");
    res.redirect("/carrito");
  }
};

// Renderiza el formulario para agregar un producto al carrito
export const renderAddToCarrito = async (req, res) => {
  try {
    const [productos] = await pool.query("SELECT * FROM productos");
    res.render("carrito/add", { productos });
  } catch (error) {
    console.error(error);
    req.setFlash("error", "Error al obtener los productos");
    res.redirect("/carrito");
  }
};

// Agrega un producto al carrito
export const addToCarrito = async (req, res) => {
  const { producto_id, cantidad } = req.body;
  try {
    // Verifica si el producto ya está en el carrito
    const [existingProduct] = await pool.query("SELECT * FROM carrito WHERE producto_id = ?", [producto_id]);
    
    if (existingProduct.length > 0) {
      // Si el producto ya está en el carrito, actualiza la cantidad
      await pool.query("UPDATE carrito SET cantidad = cantidad + ? WHERE producto_id = ?", [cantidad, producto_id]);
    } else {
      // Si el producto no está en el carrito, agrega uno nuevo
      await pool.query("INSERT INTO carrito (producto_id, cantidad) VALUES (?, ?)", [producto_id, cantidad]);
    }
    
    req.setFlash("success", "Producto agregado al carrito exitosamente");
    res.redirect("/carrito");
  } catch (error) {
    console.error(error);
    req.setFlash("error", "Error al agregar el producto al carrito");
    res.redirect("/carrito/add");
  }
};

// Elimina un producto del carrito
export const deleteFromCarrito = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM carrito WHERE id = ?", [id]);
    req.setFlash("success", "Producto eliminado del carrito exitosamente");
    res.redirect("/carrito");
  } catch (error) {
    console.error(error);
    req.setFlash("error", "Error al eliminar el producto del carrito");
    res.redirect("/carrito");
  }
};

// Renderiza el formulario para editar la cantidad de un producto en el carrito
export const renderEditCarrito = async (req, res) => {
  const { id } = req.params;
  const [carritoItem] = await pool.query("SELECT * FROM carrito WHERE id = ?", [id]);
  
  if (carritoItem.length === 0) {
    req.setFlash("error", "Producto no encontrado en el carrito");
    return res.redirect("/carrito");
  }
  
  res.render("carrito/edit", { carrito: carritoItem[0] });
};

// Actualiza la cantidad de un producto en el carrito
export const editCarrito = async (req, res) => {
  const { id } = req.params;
  const { cantidad } = req.body;
  try {
    await pool.query("UPDATE carrito SET cantidad = ? WHERE id = ?", [cantidad, id]);
    req.setFlash("success", "Cantidad del producto actualizada exitosamente");
    res.redirect("/carrito");
  } catch (error) {
    console.error(error);
    req.setFlash("error", "Error al actualizar la cantidad");
    res.redirect(`/carrito/edit/${id}`);
  }
};
