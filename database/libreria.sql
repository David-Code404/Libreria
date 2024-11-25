-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 25-11-2024 a las 04:49:06
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.0.30

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
(1, 'Guía de Matemáticas', 'https://matematicas.com/guia', 'Recurso para aprender matemáticas básicas', 1, '2024-11-16 21:22:40'),
(2, 'Técnicas de Estudio', 'https://estudio.com/tecnicas', 'Métodos efectivos para estudiar', 2, '2024-11-16 21:22:40'),
(3, 'Proyectos Creativos', 'https://arteyproyectos.com', 'Ideas para arte y manualidades', 3, '2024-11-16 21:22:40');

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
('mHxQAI_QFtrxTH7WpJ8F7REK4dYOmyRa', 1732581768, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"}}'),
('wZ8lA-AHywcgrg2aC-hIVuLjzv-rKpTE', 1732592843, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"}}'),
('wZ8lA-AHywcgrg2aC-hIVuLjzv-rKpTE', 1732592843, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{}}'),
('wZ8lA-AHywcgrg2aC-hIVuLjzv-rKpTE', 1732592843, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{}}'),
('wZ8lA-AHywcgrg2aC-hIVuLjzv-rKpTE', 1732592843, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{}}'),
('wZ8lA-AHywcgrg2aC-hIVuLjzv-rKpTE', 1732592843, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{}}'),
('wZ8lA-AHywcgrg2aC-hIVuLjzv-rKpTE', 1732592843, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{}}'),
('wZ8lA-AHywcgrg2aC-hIVuLjzv-rKpTE', 1732592843, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{}}');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `fullname` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(64) NOT NULL,
  `role` enum('admin','user') NOT NULL DEFAULT 'user',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `fullname`, `email`, `password`, `role`, `created_at`) VALUES
(17, 'david', 'administrador@gmail.com', '$2a$10$Cfkh9lo8MV7kwTLFlFHuEu0zzuJ3H6rrBAhyWgaSXRVXKyQZgvCKm', 'user', '2024-11-25 00:56:22'),
(18, 'prueba1', 'prueba1@gmail.com', '$2a$10$I9ypBQDzq/Yn6fgCe74K5OvoG3cGhE6ZuQQkPcS3da2wbIWjju6.C', 'user', '2024-11-25 00:57:05'),
(19, 'Jose David Quispe Sucullani', 'josesucullani@gmail.com', '$2a$10$wb5blSh/V4fpv4kpQI51J.zUXa0m27rJILUV3ZiQ2W.vTRCnZKDb6', 'admin', '2024-11-25 00:59:18'),
(20, 'prueba1', 'pruebacambio@gmail.com', '$2a$10$PH3ySPAysJQRWmQ9Bwv4s.z9uKyGmEbicKQOgTJ723pVwPP5la8HW', 'user', '2024-11-25 03:47:08');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
