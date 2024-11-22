import { z } from "zod";

export const createCarritoSchema = z.object({
  producto_id: z
    .number({
      message: "Producto ID must be a number",
    })
    .int({
      message: "Producto ID must be an integer",
    })
    .positive({
      message: "Producto ID must be a positive number",
    }),

  cantidad: z
    .number({
      message: "Cantidad must be a number",
    })
    .int({
      message: "Cantidad must be an integer",
    })
    .positive({
      message: "Cantidad must be a positive number",
    })
    .max(100, {
      message: "Cantidad must be less than or equal to 100",
    }),

  created_at: z
    .string({
      message: "Created at must be a string",
    })
    .optional(), // Optional, since the server may set the created_at value

  updated_at: z
    .string({
      message: "Updated at must be a string",
    })
    .optional(), // Optional, since the server may update this field automatically
});
