import type { Request, Response } from "express";
import {
  getCategories,
  getAllCategories,
  createCategory,
  updateCategory,
  deactivateCategory,
  reactivateCategory,
} from "../services/categorias.service.js";
import { createCategorySchema } from "../schemas/categorias.schema.js";
import { getIdParam } from "../utils/getIdParam.js";

export async function getCategoriesController(req: Request, res: Response) {
  const categories = await getCategories();
  return res.status(200).json(categories);
}

export async function getAllCategoriesController(req: Request, res: Response) {
  const categories = await getAllCategories();
  return res.status(200).json(categories);
}

export async function createCategoryController(req: Request, res: Response) {
  const data = createCategorySchema.parse(req.body);
  const category = await createCategory(data);
  return res.status(201).json(category);
}

export async function updateCategoryController(req: Request, res: Response) {
  const id = getIdParam(req.params.id, "Id da categoria é obrigatório");

  const data = createCategorySchema.parse(req.body);
  const category = await updateCategory(id, data);
  return res.status(200).json(category);
}

export async function deactivateCategoryController(
  req: Request,
  res: Response,
) {
  const id = getIdParam(req.params.id, "Id da categoria é obrigatório");

  const category = await deactivateCategory(id);
  return res.status(200).json(category);
}

export async function reactivateCategoryController(
  req: Request,
  res: Response,
) {
  const id = getIdParam(req.params.id, "Id da categoria é obrigatório");
  const category = await reactivateCategory(id);
  res.status(200).json(category);
}
