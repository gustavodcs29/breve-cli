import { Request, Response } from "express";

export class __CLASS_NAME__Controller {
  async getAll(req: Request, res: Response) {
    try {
      return res.json({ message: "Lista de __NAME__s" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error obteniendo __NAME__s" });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      return res.json({ message: `Detalle de __NAME__ ${id}` });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error obteniendo __NAME__" });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const data = req.body;
      return res.status(201).json({ message: "__NAME__ creado", data });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error creando __NAME__" });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const data = req.body;
      return res.json({ message: `__NAME__ ${id} actualizado`, data });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error actualizando __NAME__" });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      return res.json({ message: `__NAME__ ${id} eliminado` });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error eliminando __NAME__" });
    }
  }
}
