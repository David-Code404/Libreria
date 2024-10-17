import { Router } from "express";
import { isLoggedIn } from "../middlewares/protectedRoutes.js"; // Middleware para proteger rutas
import { validator } from "../middlewares/validator.middleware.js"; // Middleware para validar datos
import {
  renderAddProducto,
  addProducto,           // Asegúrate de que este nombre coincida exactamente
  renderProductos,
  deleteProducto,
  editProducto,
  renderEditProducto,
} from "../controllers/productos.controller.js"; // Controladores de productos
import { createProductSchema } from "../schemas/productos.schema.js"; // Esquema de validación de productos

const router = Router();

// Rutas para productos
router.get("/", isLoggedIn, renderProductos); // Renderiza la lista de productos
router.get("/add", isLoggedIn, renderAddProducto); // Renderiza el formulario para agregar un nuevo producto
router.post("/add", isLoggedIn, validator(createProductSchema), addProducto); // Agrega un nuevo producto
router.get("/delete/:id", isLoggedIn, deleteProducto); // Elimina un producto por ID
router.get("/edit/:id", isLoggedIn, renderEditProducto); // Renderiza el formulario para editar un producto
router.post("/edit/:id", isLoggedIn, editProducto); // Actualiza un producto por ID

export default router; // Exporta el router
