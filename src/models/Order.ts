import mongoose from "mongoose";

const orderScheme = new mongoose.Schema({
    customer: { type: String, required: true, trim: true },
    packageSize: { type: String, required: true, trim: true },
    status: {
        type: String,
        enum: ["Pending", "In-Transit", "Delivered"],
        default: "Pending",
    },
},
{
    timestamps: { createdAt: true, updatedAt: false }
})

export default mongoose.model("Order",orderScheme)