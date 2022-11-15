import { prisma } from "..";
import { UserService } from "./user.service";


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

    public static async getOneById(id: any) {
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
            const bill = await this.getOneById(id)
            const userId =  bill.data?.userId
            
            if (!bill) {
                throw Error()
            }

            const modified = await prisma.bills.update({
                where: { id },
                data: { ...data },
            })

            if(data.price){
                await this.updateTotalBills(userId)
            }
            
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
            await this.restBill(bill.data?.userId, bill.data?.price)
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

    public static async updateTotalBills(id: any){
        try {
            const user = await UserService.getOneById(id)
            const bills = user.data?.bills
            let reduce = bills?.reduce((acumulator, bill)=> acumulator + bill.price, 0)
            await UserService.updateTotalBill(user.data?.id, reduce)
            return { success: true}
        } catch (error) {
            console.log({ error });
            return { success: false, error: 'Hubo un error' };
        }
    }
}