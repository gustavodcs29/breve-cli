import { Request, Response, NextFunction } from "express";

export function __CLASS_NAME__Middleware(req: Request, res: Response, next: NextFunction) {
  console.log("Middleware __NAME__ ejecutado");
  next();
}
