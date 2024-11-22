-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 17-11-2024 a las 22:27:10
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `libreria`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `carrito`
--

CREATE TABLE `carrito` (
  `id` int(11) NOT NULL,
  `producto_id` int(11) NOT NULL,
  `cantidad` int(11) NOT NULL DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `carrito`
--

INSERT INTO `carrito` (`id`, `producto_id`, `cantidad`, `created_at`, `updated_at`) VALUES
(1,  1, 2, '2024-11-16 17:20:52', '2024-11-16 17:20:52'),
(2,  3, 1, '2024-11-16 17:20:52', '2024-11-16 17:20:52'),
(3,  6, 5, '2024-11-16 17:20:52', '2024-11-16 17:20:52'),
(4,  1, 3, '2024-11-16 17:22:48', '2024-11-16 17:22:48'),
(5,  2, 1, '2024-11-16 17:22:48', '2024-11-16 17:22:48'),
(6,  3, 2, '2024-11-16 17:22:48', '2024-11-16 17:22:48');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categorias`
--

CREATE TABLE `categorias` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `descripcion` text DEFAULT NULL,
  `url_imagen` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `categorias`
--

INSERT INTO `categorias` (`id`, `nombre`, `descripcion`, `url_imagen`) VALUES
(1, 'Libros de Texto', 'Libros utilizados en el aula', 'https://example.com/libros_texto.jpg'),
(2, 'Libros de Lectura', 'Libros recomendados para la lectura en casa', 'https://example.com/libros_lectura.jpg'),
(3, 'Material Escolar', 'Artículos como cuadernos, lápices, etc.', 'https://example.com/material_escolar.jpg'),
(4, 'Libros de Referencia', 'Enciclopedias y diccionarios', 'https://example.com/libros_referencia.jpg'),
(5, 'Papelería', 'Artículos básicos para la oficina y el aula', 'https://example.com/papeleria.jpg'),
(6, 'Juguetes Educativos', 'Juegos para el desarrollo de habilidades', 'https://example.com/juguetes.jpg'),
(7, 'Arte y Manualidades', 'Materiales para proyectos creativos', 'https://example.com/arte.jpg');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `links`
--

CREATE TABLE `links` (
  `id` int(11) NOT NULL,
  `title` varchar(150) NOT NULL,
  `url` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `links`
--

INSERT INTO `links` (`id`, `title`, `url`, `description`, `user_id`, `created_at`) VALUES
(1, 'Guía de Matemáticas', 'https://matematicas.com/guia', 'Recurso para aprender matemáticas básicas', 1, '2024-11-16 17:22:40'),
(2, 'Técnicas de Estudio', 'https://estudio.com/tecnicas', 'Métodos efectivos para estudiar', 2, '2024-11-16 17:22:40'),
(3, 'Proyectos Creativos', 'https://arteyproyectos.com', 'Ideas para arte y manualidades', 3, '2024-11-16 17:22:40');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

CREATE TABLE `productos` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `descripcion` text DEFAULT NULL,
  `precio` decimal(10,2) NOT NULL,
  `cantidad` int(11) NOT NULL,
  `url_imagen` varchar(255) DEFAULT NULL,
  `categoria_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `productos`
--

INSERT INTO `productos` (`id`, `nombre`, `descripcion`, `precio`, `cantidad`, `url_imagen`, `categoria_id`) VALUES
(1, 'Matemáticas 1', 'Libro de texto de matemáticas para primer grado', 25.00, 15, 'https://example.com/matematicas1.jpg', 1),
(2, 'Cuentos de la Selva', 'Colección de cuentos para lectura infantil', 15.50, 10, 'https://example.com/cuentos_selva.jpg', 2),
(3, 'Cuaderno Universitario', 'Cuaderno universitario de 100 hojas', 3.00, 50, 'https://example.com/cuaderno_universitario.jpg', 3),
(4, 'Enciclopedia Escolar', 'Enciclopedia general para estudiantes', 35.99, 5, 'https://example.com/enciclopedia.jpg', 4),
(5, 'Geografía del Mundo', 'Libro de texto sobre geografía', 30.00, 20, 'https://example.com/geografia.jpg', 1),
(6, 'Lápices de Colores', 'Paquete de lápices de colores', 5.99, 100, 'https://example.com/lapices.jpg', 3),
(7, 'Cartulina Blanca', 'Cartulina tamaño carta blanca', 1.50, 100, 'https://example.com/cartulina.jpg', 1),
(8, 'Set de Pintura', 'Set de pintura con 12 colores', 12.99, 30, 'https://example.com/pintura.jpg', 3),
(9, 'Juego de Construcción', 'Juego educativo con bloques de construcción', 25.00, 20, 'https://example.com/construccion.jpg', 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sessions`
--

CREATE TABLE `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int(11) UNSIGNED NOT NULL,
  `data` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `sessions`
--

INSERT INTO `sessions` (`session_id`, `expires`, `data`) VALUES
('S8Ezbb5hlOBn99ercH9yBwCRY7MoR4py', 1731965110, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"passport\":{\"user\":5},\"flash\":{}}');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `fullname` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(64) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `fullname`, `email`, `password`, `created_at`) VALUES
(1, 'John Carter', 'john@gmail.com', 'ef92b778bafe771e89245b89ecbc08a44a4e166c06659911881f383d4473e94f', '2024-11-16 17:20:52'),
(2, 'Alice Smith', 'alice@example.com', '4e40e8ffe0ee32fa53e139147ed559229a5930f89c2204706fc174beb36210b3', '2024-11-16 17:22:18'),
(3, 'Bob Johnson', 'bob@example.com', 'ed4d9437294706c60027d39427f6f5850870625544bb77722aac19f97495b2b7', '2024-11-16 17:22:18'),
(4, 'Charlie Brown', 'charlie@example.com', '22ad18a03fd26627225366c2337f1c93693c89fc89b62b8dff3d393e9761d139', '2024-11-16 17:22:18'),
(5, 'Jose David', 'josesucullani@gmail.com', '$2a$10$rB9H.emMvto4X6Mk9zR6eemmvM8xV21kkctAoKZu1TuhY3DZEELIm', '2024-11-16 17:24:22');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `carrito`
--
ALTER TABLE `carrito`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `producto_id` (`producto_id`);

--
-- Indices de la tabla `categorias`
--
ALTER TABLE `categorias`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `links`
--
ALTER TABLE `links`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indices de la tabla `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `categoria_id` (`categoria_id`);

--
-- Indices de la tabla `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`session_id`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `carrito`
--
ALTER TABLE `carrito`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `categorias`
--
ALTER TABLE `categorias`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `links`
--
ALTER TABLE `links`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `productos`
--
ALTER TABLE `productos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `carrito`
--
ALTER TABLE `carrito`
  ADD CONSTRAINT `carrito_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `carrito_ibfk_2` FOREIGN KEY (`producto_id`) REFERENCES `productos` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `links`
--
ALTER TABLE `links`
  ADD CONSTRAINT `links_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `productos`
--
ALTER TABLE `productos`
  ADD CONSTRAINT `productos_ibfk_1` FOREIGN KEY (`categoria_id`) REFERENCES `categorias` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
