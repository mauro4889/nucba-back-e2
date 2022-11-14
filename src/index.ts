import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';

import userRouter from './routes/users.routes'
import billsRouter from './routes/bills.routes'

import dotenv from 'dotenv';
dotenv.config();

export const prisma = new PrismaClient();

const server = express();

server.use(express.json());
server.use(cors());

server.use('/user', userRouter)
server.use('/bill', billsRouter)


server.listen(3000, () => {
    console.log('Funcionando OK');
});