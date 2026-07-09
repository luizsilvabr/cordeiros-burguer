import type { Request, Response } from "express";
import {
  createItem,
  updateItem,
  deleteItem,
} from "../services/itens.service.js";
import { createItemSchema } from "../schemas/itens.schema.js";
import { getIdParam } from "../utils/getIdParam.js";

export async function createItemController(req: Request, res: Response) {
  const groupId = getIdParam(req.params.grupoId, "Id do grupo é obrigatório");
  const data = createItemSchema.parse(req.body);
  const item = await createItem(groupId, data);
  return res.status(201).json(item);
}

export async function updateItemController(req: Request, res: Response) {
  const groupId = getIdParam(req.params.grupoId, "Id do grupo é obrigatório");
  const itemId = getIdParam(req.params.itemId, "Id do item é obrigatório");
  const data = createItemSchema.parse(req.body);
  const item = await updateItem(groupId, itemId, data);
  return res.status(200).json(item);
}

export async function deleteItemController(req: Request, res: Response) {
  const groupId = getIdParam(req.params.grupoId, "Id do grupo é obrigatório");
  const itemId = getIdParam(req.params.itemId, "Id do item é obrigatório");
  await deleteItem(groupId, itemId);
  return res.status(204).send();
}
