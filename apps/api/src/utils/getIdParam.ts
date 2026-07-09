import { BadRequestError } from "../errors/AppError.js";

export function getIdParam(id: unknown, message = "Id é obrigatório"): string {
  if (!id || typeof id !== "string") {
    throw new BadRequestError(message);
  }
  return id;
}