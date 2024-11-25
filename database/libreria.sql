

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

-- --------------------------------------------------------
-- Estructura de tabla para la tabla `users` con campo `role`
-- --------------------------------------------------------

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `fullname` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(64) NOT NULL,
  `role` enum('admin', 'user') NOT NULL DEFAULT 'user',  -- Campo para diferenciar entre admin y usuario
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------
-- Volcado de datos para la tabla `users` con roles
-- --------------------------------------------------------

INSERT INTO `users` (`id`, `fullname`, `email`, `password`, `role`, `created_at`) VALUES
(1, 'John Carter', 'john@gmail.com', 'ef92b778bafe771e89245b89ecbc08a44a4e166c06659911881f383d4473e94f', 'admin', '2024-11-16 17:20:52'),
(2, 'Alice Smith', 'alice@example.com', '4e40e8ffe0ee32fa53e139147ed559229a5930f89c2204706fc174beb36210b3', 'user', '2024-11-16 17:22:18'),
(3, 'Bob Johnson', 'bob@example.com', 'ed4d9437294706c60027d39427f6f5850870625544bb77722aac19f97495b2b7', 'user', '2024-11-16 17:22:18'),
(4, 'Charlie Brown', 'charlie@example.com', '22ad18a03fd26627225366c2337f1c93693c89fc89b62b8dff3d393e9761d139', 'user', '2024-11-16 17:22:18'),
(5, 'Jose David', 'josesucullani@gmail.com', '$2a$10$rB9H.emMvto4X6Mk9zR6eemmvM8xV21kkctAoKZu1TuhY3DZEELIm', 'user', '2024-11-16 17:24:22');
