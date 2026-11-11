"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const order_1 = __importDefault(require("./route/order"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)({ origin: process.env.CLIENT_URL || "*" }));
app.use(express_1.default.json());
let connecting = null;
app.use(async (_req, res, next) => {
    try {
        if (mongoose_1.default.connection.readyState !== 1) {
            connecting = connecting ?? mongoose_1.default.connect(process.env.MONGO_URI);
            await connecting;
        }
        next();
    }
    catch (err) {
        connecting = null;
        console.error("DB connection failed:", err);
        res.status(500).json({ error: "Database connection failed" });
    }
});
app.get("/", (_req, res) => {
    res.json({ status: "AquaFresh API running" });
});
app.use("/orders", order_1.default);
exports.default = app;
