import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { UnauthorizedError } from "../errors/AppError.js";

const JWT_SECRET = process.env.JWT_SECRET as string;

interface TokenPayload {
  sub: string;
  role: string;
}

export function authGuard(req: Request, _res: Response, next: NextFunction) {
  const token = req.cookies?.token;

  if (!token) {
    throw new UnauthorizedError("Não autenticado");
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET) as TokenPayload;
    req.user = { id: payload.sub, role: payload.role };
    next();
  } catch {
    throw new UnauthorizedError("Sessão inválida ou expirada");
  }
}