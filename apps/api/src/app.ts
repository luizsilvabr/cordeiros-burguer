import express from "express";
import cors from "cors";
import { errorHandler } from "./middlewares/errorHandler.js";
import { notFoundHandler } from "./middlewares/notFoundHandler.js";
import { authRoutes } from "./routes/auth.routes.js";
import { categoriasRoutes } from "./routes/categorias.routes.js";
import cookieParser from "cookie-parser";
import { produtosRoutes } from "./routes/produtos.routes.js";

export const app = express();

const FRONTEND_URL = process.env.FRONTEND_URL ?? "http://localhost:5173";

app.use(cors({ origin: FRONTEND_URL, credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/auth", authRoutes);
app.use("/categorias", categoriasRoutes);
app.use("/produtos", produtosRoutes);

app.use(notFoundHandler);
app.use(errorHandler);
