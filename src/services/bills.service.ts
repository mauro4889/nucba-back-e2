import { prisma } from "..";


export class BillsService {
    constructor() { }

    static async create({ title, description, type, userId, price }: any) {
        try {
            const addBill = await this.addBill(userId, price)
            const created = await prisma.bills.create({
                data: {
                    title,
                    description,
                    type,
                    price,
                    user: {
                        connect: { id: userId }
                    }
                }
            })
            return { success: true, bill: created };
        } catch (error) {
            console.log({ error });
            return { sucess: false, error: 'Hubo un error' };
        }
    }

    public static async getAll() {
        try {
            const data = await prisma.bills.findMany({
                include:{
                    user: true
                }
            });
            return { success: true, data };
        } catch (error) {
            console.log({ error });
            return { success: false, error: 'Hubo un error' };
        }
    }

    public static async getOneById(id: number) {
        try {
            const data = await prisma.bills.findUnique({ where: { id } });
            return { success: true, data };
        } catch (error) {
            console.log({ error });
            return { success: false, error: 'Hubo un error' };
        }
    }

    public static async update(id: number, data: any) {
        try {
            console.log(id)
            const bill = await this.getOneById(id)
            if (!bill) {
                throw Error()
            }
            if(data.price >= 0){
                this.restBill(bill.data?.userId, bill.data?.price)
                this.addBill(bill.data?.userId, bill.data?.price)
            }
            const modified = await prisma.bills.update({
                where: { id },
                data: { ...data },
            })
            return { success: true, modified }
        }
        catch (error) {
            console.log({ error });
            return { success: false, error: 'Hubo un error' };
        }
    }

    public static async delete(id: any) {
        try {
            const bill = await this.getOneById(id)
            const restBill = await this.restBill(bill.data?.userId, bill.data?.price)
            const deleteBill = await prisma.bills.delete({ where: { id }})
            return { success: true, deleteBill };
        } catch (error) {
            console.log({ error });
            return { success: false, error: 'Hubo un error' };
        }
    }

    public static async addBill(id: any, data: any) {
        try {
            const user = this.getOneById(id)
            if (!user) {
                throw Error()
            }
            const modified = await prisma.user.update({
                where: { id },
                data: { totalBills: {increment: data} },
            })
            return { success: true, modified }
        }
        catch (error) {
            console.log({ error });
            return { success: false, error: 'Hubo un error' };
        }
    }

    public static async restBill(id: any, data: any) {
        try {
            const user = this.getOneById(id)
            if (!user) {
                throw Error()
            }
            const modified = await prisma.user.update({
                where: { id },
                data: { totalBills: {decrement: data} },
            })
            return { success: true, modified }
        }
        catch (error) {
            console.log({ error });
            return { success: false, error: 'Hubo un error' };
        }
    }
}