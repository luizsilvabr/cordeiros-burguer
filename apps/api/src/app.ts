import express from "express";
import cors from "cors";
import { errorHandler } from "./middlewares/errorHandler.js";
import { notFoundHandler } from "./middlewares/notFoundHandler.js";

export const app = express();

app.use(cors());
app.use(express.json());

// TODO: montar as rotas aqui nos próximos passos
// app.use("/auth", authRoutes);
// app.use("/categorias", categoriaRoutes);
// app.use("/produtos", produtoRoutes);

app.use(notFoundHandler);
app.use(errorHandler);