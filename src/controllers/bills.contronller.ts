import { Request, Response } from "express";
import { BillsService } from "../services/bills.service";


export class BillsController {
    constructor() { }

    public static async create(req: Request, res: Response) {
        const { title, description, type, price, userid } = req.body
        const created = await BillsService.create({
            title,
            description,
            type,
            price,
            userid
        })

        res.status(created.success ? 201 : 400).send(created);
    }

    public static async getAll(_req: Request, res: Response) {
        const bills = await BillsService.getAll();
        res.status(bills.success ? 200 : 404).send(bills);
    }

    public static async getid(req: Request, res: Response) {
        const { id } = req.params;
        const getData = await BillsService.getOneById(+id);
        res.status(getData.success ? 200 : 400).send(getData);
    }

    public static async update(req: Request, res: Response) {
        const { id } = req.params
        const update = await BillsService.update(+id, req.body)

        res.status(update.success ? 200 : 400).send(update)
    }

    public static async delete(req: Request, res: Response) {
        const { id } = req.params
        const deleteUser = await BillsService.delete(id)

        res.status(deleteUser.success ? 200 : 400).send(deleteUser)
    }
}