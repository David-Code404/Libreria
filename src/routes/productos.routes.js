import { Router } from "express";
import { isLoggedIn } from "../middlewares/protectedRoutes.js"; // Middleware para proteger rutas
import { validator } from "../middlewares/validator.middleware.js"; // Middleware para validar datos
import {
  renderAddProducto,
  addProducto,
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
router.post("/add", isLoggedIn, validator(createProductSchema), addProducto); // Maneja la creación de un producto
router.get("/delete/:id", isLoggedIn, deleteProducto); // Maneja la eliminación de un producto
router.get("/edit/:id", isLoggedIn, renderEditProducto); // Renderiza el formulario de edición de un producto
router.post("/edit/:id", isLoggedIn, editProducto); // Maneja la actualización de un producto

export default router;
