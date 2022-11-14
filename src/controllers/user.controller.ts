import { Request, Response } from "express";
import { UserService } from "../services/user.service";


export class UserController {
    constructor() { }

    static async create(req: Request, res: Response) {
        const  {name}  = req.body
        const created = await UserService.create({
            name
        })
        res.status(created.success ? 200 : 400).send(created);
    }

    public static async get(req: Request, res: Response) {
        const getData = await UserService.getAll();
        res.status(getData.success ? 200 : 400).send(getData);
    }

    public static async getID(req: Request, res: Response) {
        const { ID } = req.params;
        const getData = await UserService.getOneById(ID);
        res.status(getData.success ? 200 : 400).send(getData);
    }

    public static async update(req: Request, res: Response) {
        const { ID } = req.params
        const update = await UserService.updateUser(ID, req.body)

        res.status(update.success ? 200 : 400).send(update)
    }

    public static async delete(req: Request, res: Response) {
        const { ID } = req.params
        const deleteUser = await UserService.delete(ID)

        res.status(deleteUser.success ? 200 : 400).send(deleteUser)
    }
}