import { z } from "zod";

// Esquema de validación para crear un producto
export const createProductSchema = z.object({
  nombre: z
    .string({
      required_error: "Nombre es requerido", // Mensaje de error si falta el nombre
      invalid_type_error: "Nombre debe ser una cadena", // Mensaje si el tipo no es una cadena
    })
    .min(3, {
      message: "Nombre debe tener al menos 3 caracteres", // Mensaje si el nombre es demasiado corto
    })
    .max(100, {
      message: "Nombre debe tener como máximo 100 caracteres", // Mensaje si el nombre es demasiado largo
    }),
    
  descripcion: z
    .string({
      required_error: "Descripción es requerida", // Mensaje de error si falta la descripción
      invalid_type_error: "Descripción debe ser una cadena", // Mensaje si el tipo no es una cadena
    })
    .max(1000, {
      message: "Descripción debe tener como máximo 1000 caracteres", // Mensaje si la descripción es demasiado larga
    }),

  precio: z
    .number({
      required_error: "Precio es requerido", // Mensaje de error si falta el precio
      invalid_type_error: "Precio debe ser un número", // Mensaje si el tipo no es un número
    })
    .min(0, {
      message: "Precio debe ser mayor o igual a 0", // Mensaje si el precio es negativo
    }),

  cantidad: z
    .number({
      required_error: "Cantidad es requerida", // Mensaje de error si falta la cantidad
      
    })
    .min(0, {
      message: "Cantidad debe ser mayor o igual a 0", // Mensaje si la cantidad es negativa
    }),

  url_imagen: z
    .string({
      required_error: "URL de imagen es requerida", // Mensaje de error si falta la URL de la imagen
      invalid_type_error: "URL de imagen debe ser una cadena", // Mensaje si el tipo no es una cadena
    })
    .url({
      message: "URL de imagen debe ser una URL válida", // Mensaje si la URL no es válida
    }),

  
});

// Ejemplo de uso
const validateProduct = async (data) => {
  try {
    const validatedData = createProductSchema.parse(data);
    console.log("Datos válidos:", validatedData);
  } catch (e) {
    if (e instanceof z.ZodError) {
      console.error("Errores de validación:", e.errors);
    }
  }
};

// Llamada de ejemplo
validateProduct({
  nombre: "Producto Ejemplo",
  descripcion: "Descripción del producto ejemplo.",
  precio: 9999,
  cantidad: 9999,
  url_imagen: "https://example.com/image.jpg",
});
/*aka son los mensajes y requerimientos que se pide lgo como un ER expresiones regulares */