import { Router } from "express";
import auth from "./auth.routes.js";
import index from "./index.routes.js";
import productos from "./productos.routes.js";
import user from "./users.routes.js";
import categorias from "./categorias.routes.js"; // Cambia el nombre si corresponde
import usuarios from "./usuarios.routes.js";  // Ruta para la gestión de usuarios

const router = Router();

// Uso de rutas
router.use(index); // Ruta para la página de inicio
router.use(auth);  // Ruta para autenticación
router.use(user);  // Ruta para gestión de usuarios
router.use("/productos", productos); // Ruta para gestión de productos
router.use("/categorias", categorias); // Ruta para gestión de categorías
router.use("/usuarios", usuarios); // Ruta para la gestión de usuarios

export default router;
