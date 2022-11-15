import { prisma } from "..";


export class UserService {
    constructor() { }

    static async create({name}: any) {
        try {
            const created = await prisma.user.create({
                data: {
                    name
                }
            })
            return { success: true, user: created };
        } catch (error) {
            console.log({ error })
            return { sucess: false, error: 'Hubo un error' };
        }
    }

    public static async getAll() {
        try {
            const data = await prisma.user.findMany({
                include:{
                    bills: true
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
            const data = await prisma.user.findUnique({ where: { id }, include:{bills: true} });
            return { success: true, data };
        } catch (error) {
            console.log({ error });
            return { success: false, error: 'Hubo un error' };
        }
    }

    public static async update(id: any, data: any) {
        try {
            const user = this.getOneById(id)
            if (!user) {
                throw Error()
            }
            const modified = await prisma.user.update({
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
            const deleteUser = await prisma.user.delete({ where: { id }})
            return { success: true, deleteUser };
        } catch (error) {
            console.log({ error });
            return { success: false, error: 'Hubo un error' };
        }
    }

    static async updateTotalBill(id:any, totalBills:any){
        try {
            const user = this.getOneById(id)
            if (!user) {
                throw Error()
            }
            const modified = await prisma.user.update({
                where: { id },
                data: { totalBills },
            })
            return { success: true, modified }
        } catch (error) {
            
        }
    }
}