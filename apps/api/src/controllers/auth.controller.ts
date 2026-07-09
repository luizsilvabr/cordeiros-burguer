import type { Request, Response } from "express";
import { loginSchema, registerSchema } from "../schemas/auth.schema.js";
import { loginUser, registerUser } from "../services/auth.service.js";

const COOKIE_NAME = "token";
const COOKIE_MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000; // 7 dias
const isProduction = process.env.NODE_ENV === "production";

export async function register(req: Request, res: Response) {
  const data = registerSchema.parse(req.body);
  const user = await registerUser(data);
  return res.status(201).json(user);
}

export async function login(req: Request, res: Response) {
  const data = loginSchema.parse(req.body);
  const { token, user } = await loginUser(data);

  res.cookie(COOKIE_NAME, token, {
    httpOnly: true,
    secure: isProduction,
    sameSite: "lax",
    maxAge: COOKIE_MAX_AGE_MS,
    path: "/",
  });

  return res.status(200).json({ user });
}

export async function logout(_req: Request, res: Response) {
  res.clearCookie(COOKIE_NAME, { path: "/" });
  return res.status(204).send();
}

export async function me(req: Request, res: Response) {
  return res.status(200).json({ user: req.user });
}
