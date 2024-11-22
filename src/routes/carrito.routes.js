import { Router } from "express";
import { isLoggedIn } from "../middlewares/protectedRoutes.js";
import {
  renderCarrito,
  addToCarrito,
  renderAddToCarrito,
  deleteFromCarrito,
  editCarrito,
  renderEditCarrito,
} from "../controllers/carrito.controller.js";

const router = Router();

// Rutas para el carrito
router.get("/", isLoggedIn, renderCarrito); // Ver productos en el carrito
router.get("/add", isLoggedIn, renderAddToCarrito); // Agregar productos
router.post("/add", isLoggedIn, addToCarrito); // Procesar agregar productos
router.get("/delete/:id", isLoggedIn, deleteFromCarrito); // Eliminar productos
router.get("/edit/:id", isLoggedIn, renderEditCarrito); // Editar productos
router.post("/edit/:id", isLoggedIn, editCarrito); // Actualizar cantidad de productos

export default router;
