import { Router } from "express";
import { isLoggedIn } from "../middlewares/protectedRoutes.js";
import {
  renderAddUser,
  addUser,
  renderUsers,
  deleteUser,
  editUser,
  renderEditUser,
} from "../controllers/usuarios.controller.js";

const router = Router();

// Rutas para los usuarios
router.get("/", isLoggedIn, renderUsers); // Renderiza la lista de usuarios
router.get("/add", isLoggedIn, renderAddUser); // Renderiza el formulario para agregar un usuario
router.post("/add", isLoggedIn, addUser); // Agrega un nuevo usuario
router.get("/delete/:id", isLoggedIn, deleteUser); // Elimina un usuario
router.get("/edit/:id", isLoggedIn, renderEditUser); // Renderiza el formulario para editar un usuario
router.post("/edit/:id", isLoggedIn, editUser); // Actualiza un usuario

export default router;
