import { z } from "zod";

export const createCategorySchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  order: z.number().int().nonnegative().optional(),
});

export type CreateCategoryInput = z.infer<typeof createCategorySchema>;
