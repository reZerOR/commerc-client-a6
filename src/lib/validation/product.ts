import { z } from "zod";

export const productSchema = z.object({
    title: z.string(),
    price: z
      .string()
      .regex(/^\d+$/, "Price must be a positive number"),
    quantity: z
      .string()
      .regex(/^\d+$/, "Quantity must be a positive number"),
    category: z.string(),
    description: z.string(),
    image: z.string(),
  });
export const productUpdateSchema = z.object({
    title: z.string(),
    price: z
      .string()
      .regex(/^\d+$/, "Price must be a positive number"),
    quantity: z
      .string()
      .regex(/^\d+$/, "Quantity must be a positive number"),
    category: z.string(),
    description: z.string(),
  });
