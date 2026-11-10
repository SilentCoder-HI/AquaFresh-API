import { Router } from "express";
import { Request, Response } from "express";
import Order from "../models/Order";

const ordersRouter = Router()

ordersRouter.get('/', async (req: Request, res: Response) => {
    try {
        res.json(await Order.find().sort({ createdAt: -1 }))

    } catch (e) {
        console.error(e)
    }
})

ordersRouter.post('/', async (req: Request, res: Response) => {
    try {
        const { customer, packageSize, status } = req.body;
        const order = await Order.create({ customer, packageSize, status });
        res.status(201).json(order);
    }
    catch (e) {
        console.error(e)
    }
})

export default ordersRouter