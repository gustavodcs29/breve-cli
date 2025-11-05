import { Request, Response } from "express";
import { __CAPITALIZED_NAME__Service } from "./__NAME__.service";

export const __CAPITALIZED_NAME__Controller = {
  async getAll(req: Request, res: Response) {
    const items = await __CAPITALIZED_NAME__Service.getAll();
    res.json(items);
  },
  async getById(req: Request, res: Response) {
    const item = await __CAPITALIZED_NAME__Service.getById(Number(req.params.id));
    if (!item) return res.status(404).json({ message: "__CAPITALIZED_NAME__ not found" });
    res.json(item);
  },
  async create(req: Request, res: Response) {
    const item = await __CAPITALIZED_NAME__Service.create(req.body);
    res.status(201).json(item);
  },
};
