import { Request, Response } from "express";

export default {
    getHome: (req: Request, res: Response) => {
        res.send("Hola desde Breve ☕");
    },
};
