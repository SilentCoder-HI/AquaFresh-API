import { NextFunction, Router, Request, Response } from "express";
import Order from "../models/Order";
import mongoose from "mongoose";

const ordersRouter = Router();

const validID = (req: Request, res: Response, next: NextFunction) => {
    if (!mongoose.isValidObjectId(req.params.id)) {
        res.status(400).json({ error: "Invalid Id" });
        return;
    }
    next();
};

ordersRouter.get("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.json(await Order.find().sort({ createdAt: -1 }));
    } catch (e) {
        next(e);
    }
});

ordersRouter.post("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { customer, packageSize, status } = req.body;
        const order = await Order.create({ customer, packageSize, status });
        res.status(201).json(order);
    } catch (e) {
        next(e);
    }
});

ordersRouter.patch("/:id", validID, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const order = await Order.findByIdAndUpdate(
            req.params.id,
            { status: req.body.status },
            { new: true, runValidators: true }
        );
        if (!order) {
            res.status(404).json({ error: "Order not found" });
            return;
        }
        res.json(order);
    } catch (e) {
        next(e);
    }
});


ordersRouter.delete("/:id", validID, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) return res.status(404).json({ error: "Order not found" });
    res.json({ message: "Order deleted", id: order._id });
  } catch (e) { next(e); }
});

export default ordersRouter;