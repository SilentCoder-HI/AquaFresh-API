import "dotenv/config";
import express, { type NextFunction, type Request, type Response } from "express";
import mongoose from "mongoose";
import cors from "cors";
import ordersRouter from "./route/order";

const app = express();

app.use(cors({ origin: process.env.CLIENT_URL || "*" }));
app.use(express.json());

let connecting: Promise<typeof mongoose> | null = null;

app.use(async (_req: Request, res: Response, next: NextFunction) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      connecting = connecting ?? mongoose.connect(process.env.MONGO_URI as string);
      await connecting;
    }
    next();
  } catch (err) {
    connecting = null;
    console.error("DB connection failed:", err);
    res.status(500).json({ error: "Database connection failed" });
  }
});

app.get("/", (_req: Request, res: Response) => {
  res.json({ status: "AquaFresh API running" });
});

app.use("/orders", ordersRouter);

export default app;
