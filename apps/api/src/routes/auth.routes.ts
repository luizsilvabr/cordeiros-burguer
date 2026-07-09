import { Router } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import { authGuard } from "../middlewares/authGuard.js";
import { login, logout, me, register } from "../controllers/auth.controller.js";

export const authRoutes = Router();

// Antes de ir pra produção, proteger ou remover essa rota.
authRoutes.post("/register", asyncHandler(register));

authRoutes.post("/login", asyncHandler(login));
authRoutes.post("/logout", asyncHandler(logout));
authRoutes.get("/me", authGuard, asyncHandler(me));
