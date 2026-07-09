import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { prisma } from "../lib/prisma.js";
import { ConflictError, UnauthorizedError } from "../errors/AppError.js";
import type { LoginInput, RegisterInput } from "../schemas/auth.schema.js";

const SALT_ROUNDS = 10;
const JWT_SECRET = process.env.JWT_SECRET as string;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN ?? "7d";

export async function registerUser(data: RegisterInput) {
  const existing = await prisma.user.findUnique({
    where: { email: data.email },
  });
  if (existing) {
    throw new ConflictError("Já existe um usuário com esse e-mail");
  }

  const passwordHash = await bcrypt.hash(data.password, SALT_ROUNDS);

  const user = await prisma.user.create({
    data: {
      name: data.name,
      email: data.email,
      passwordHash,
    },
  });

  return { id: user.id, name: user.name, email: user.email, role: user.role };
}

export async function loginUser(data: LoginInput) {
  const user = await prisma.user.findUnique({ where: { email: data.email } });
  if (!user) {
    throw new UnauthorizedError("E-mail ou senha inválidos");
  }

  const passwordMatches = await bcrypt.compare(
    data.password,
    user.passwordHash,
  );
  if (!passwordMatches) {
    throw new UnauthorizedError("E-mail ou senha inválidos");
  }

  const token = jwt.sign({ sub: user.id, role: user.role }, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  } as jwt.SignOptions);

  return {
    token,
    user: { id: user.id, name: user.name, email: user.email, role: user.role },
  };
}
