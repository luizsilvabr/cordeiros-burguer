import { z } from "zod";

export const createGroupSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  type: z.enum(["SINGLE", "MULTIPLE"]),
  required: z.boolean().optional().default(false),
});

export type CreateGroupInput = z.infer<typeof createGroupSchema>;
