import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import router from "./routes";

dotenv.config();

export const app = express();

app.use(cors());
app.use(express.json());

// Rutas principales
app.use("/api", router);

app.get("/", (_, res) => {
  res.send("🚀 Bienvenido a __PROJECT_NAME__ API");
});