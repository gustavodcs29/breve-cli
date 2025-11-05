import { Router } from "express";


// ANCLA: IMPORTACIONES


export const router = Router();

router.get("/health", (_, res) => {
  res.json({
    status: "ok",
    message: "API saludable 🩺",
  });
});

// ANCLA: RUTAS