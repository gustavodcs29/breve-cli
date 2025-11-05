import { Router } from "express";
import { __CAPITALIZED_NAME__Controller } from "./__NAME__.controller";

const router = Router();

router.get("/", __CAPITALIZED_NAME__Controller.getAll);
router.get("/:id", __CAPITALIZED_NAME__Controller.getById);
router.post("/", __CAPITALIZED_NAME__Controller.create);

export default router;
