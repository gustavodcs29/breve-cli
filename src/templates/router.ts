import { Router } from "express";
import { __CLASS_NAME__Controller } from "../controllers/__NAME__.controller";

const controller = new __CLASS_NAME__Controller();
export const __CLASS_NAME__Router = Router();

__CLASS_NAME__Router.get("/", controller.getAll.bind(controller));
__CLASS_NAME__Router.get("/:id", controller.getById.bind(controller));
__CLASS_NAME__Router.post("/", controller.create.bind(controller));
__CLASS_NAME__Router.put("/:id", controller.update.bind(controller));
__CLASS_NAME__Router.delete("/:id", controller.delete.bind(controller));
