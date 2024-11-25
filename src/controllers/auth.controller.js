/* No Tocar */
import passport from "passport";
import { encryptPassword } from "../lib/helpers.js";
import { pool } from "../database.js";

export const renderSignUp = (req, res) => res.render("auth/signup");

export const signUp = async (req, res, next) => {
  const { fullname, email, password1, role } = req.body; // Capturamos el rol del formulario

  const password = await encryptPassword(password1);

  try {
    // Guardando en la base de datos
    const [result] = await pool.query("INSERT INTO users SET ?", {
      fullname,
      email,
      password,
      role: role || "user", // Asignamos el rol 'user' por defecto si no se seleccionó
    });

    req.login(
      {
        id: result.insertId,
        fullname,
        email,
        role: role || "user", // También añadimos el rol a la sesión
      },
      (err) => {
        if (err) {
          return next(err);
        }
        return res.redirect("/productos"); // Redirigimos a productos o la ruta correspondiente
      }
    );
  } catch (error) {
    // Manejo de errores
    console.error("Error al crear usuario:", error);
    req.flash("error", "Error al crear usuario, intente de nuevo.");
    res.redirect("/signup");
  }
};

export const renderSignIn = (req, res) => {
  res.render("auth/signin");
};

export const signIn = passport.authenticate("local.signin", {
  successRedirect: "/productos", // Cambiado a productos si es necesario
  failureRedirect: "/signin",
  passReqToCallback: true,
  failureFlash: true,
});

export const logout = (req, res, next) => {
  req.logout(function (err) {
    if (err) return next(err);
    res.redirect("/");
  });
};
