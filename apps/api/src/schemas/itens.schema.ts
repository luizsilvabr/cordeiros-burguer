import { z } from "zod";

export const createItemSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  extraPrice: z
    .number()
    .min(0, "Preço extra não pode ser negativo")
    .optional()
    .default(0),
});

export type CreateItemInput = z.infer<typeof createItemSchema>;
