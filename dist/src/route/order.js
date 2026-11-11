"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Order_1 = __importDefault(require("../models/Order"));
const mongoose_1 = __importDefault(require("mongoose"));
const ordersRouter = (0, express_1.Router)();
const validID = (req, res, next) => {
    if (!mongoose_1.default.isValidObjectId(req.params.id)) {
        res.status(400).json({ error: "Invalid Id" });
        return;
    }
    next();
};
ordersRouter.get("/", async (req, res, next) => {
    try {
        res.json(await Order_1.default.find().sort({ createdAt: -1 }));
    }
    catch (e) {
        next(e);
    }
});
ordersRouter.post("/", async (req, res, next) => {
    try {
        const { customer, packageSize, status } = req.body;
        const order = await Order_1.default.create({ customer, packageSize, status });
        res.status(201).json(order);
    }
    catch (e) {
        next(e);
    }
});
ordersRouter.patch("/:id", validID, async (req, res, next) => {
    try {
        const order = await Order_1.default.findByIdAndUpdate(req.params.id, { status: req.body.status }, { returnDocument: "after", runValidators: true });
        if (!order) {
            res.status(404).json({ error: "Order not found" });
            return;
        }
        res.json(order);
    }
    catch (e) {
        next(e);
    }
});
ordersRouter.delete("/:id", validID, async (req, res, next) => {
    try {
        const order = await Order_1.default.findByIdAndDelete(req.params.id);
        if (!order)
            return res.status(404).json({ error: "Order not found" });
        res.json({ message: "Order deleted", id: order._id });
    }
    catch (e) {
        next(e);
    }
});
exports.default = ordersRouter;
