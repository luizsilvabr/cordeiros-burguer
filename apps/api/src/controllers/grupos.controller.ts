import type { Request, Response } from "express";
import {
  createGroup,
  updateGroup,
  deleteGroup,
} from "../services/grupos.service.js";
import { createGroupSchema } from "../schemas/grupos.schema.js";
import { getIdParam } from "../utils/getIdParam.js";

export async function createGroupController(req: Request, res: Response) {
  const productId = getIdParam(
    req.params.produtoId,
    "Id do produto é obrigatório",
  );
  const data = createGroupSchema.parse(req.body);
  const group = await createGroup(productId, data);
  return res.status(201).json(group);
}

export async function updateGroupController(req: Request, res: Response) {
  const productId = getIdParam(
    req.params.produtoId,
    "Id do produto é obrigatório",
  );
  const groupId = getIdParam(req.params.grupoId, "Id do grupo é obrigatório");
  const data = createGroupSchema.parse(req.body);
  const group = await updateGroup(productId, groupId, data);
  return res.status(200).json(group);
}

export async function deleteGroupController(req: Request, res: Response) {
  const productId = getIdParam(
    req.params.produtoId,
    "Id do produto é obrigatório",
  );
  const groupId = getIdParam(req.params.grupoId, "Id do grupo é obrigatório");
  await deleteGroup(productId, groupId);
  return res.status(204).send();
}
