import { z } from "zod";

export const createProductSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  description: z.string().min(1).optional(),
  price: z.number().positive("Preço deve ser maior que zero"),
  imageUrl: z.string().url("URL da imagem inválida").optional(),
  categoryId: z.string().min(1, "Categoria é obrigatória"),
});

export type CreateProductInput = z.infer<typeof createProductSchema>;
