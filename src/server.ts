import "dotenv/config";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { Response, Request } from "express"
import ordersRouter from "./route/order";


const app = express()
const PORT = process.env.PORT
const uri = process.env.MONGO_URI;
if (!uri) {
  console.error("MONGO_URI is missing in .env");
  process.exit(1);
}

app.use(cors())
app.use(express.json())
app.use("/order",ordersRouter)


app.get('/', (req: Request, res: Response) => res.json({ status: "AquaFresh API running" }))


mongoose.connect(uri).then(()=>app.listen(PORT,()=> console.log(`API on http://localhost:${PORT}`)))