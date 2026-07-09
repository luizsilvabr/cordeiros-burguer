import { Router } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import {
  getCategoriesController,
  getAllCategoriesController,
  createCategoryController,
  updateCategoryController,
  deactivateCategoryController,
} from "../controllers/categorias.controller.js";
import { authGuard } from "../middlewares/authGuard.js";

export const categoriasRoutes = Router();

categoriasRoutes.get("/", asyncHandler(getCategoriesController));
categoriasRoutes.get(
  "/todas",
  authGuard,
  asyncHandler(getAllCategoriesController),
);

categoriasRoutes.post("/", authGuard, asyncHandler(createCategoryController));

categoriasRoutes.put("/:id", authGuard, asyncHandler(updateCategoryController));
categoriasRoutes.delete(
  "/:id",
  authGuard,
  asyncHandler(deactivateCategoryController),
);
