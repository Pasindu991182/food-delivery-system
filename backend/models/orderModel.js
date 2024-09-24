import mongoose from "mongoose";

// Define the schema for Order
const orderSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  items: { type: Array, required: true },
  amount: { type: Number, required: true },
  address: { type: Object, required: true },
  status: { type: String, default: "Food Processing" },
  date: { type: Date, default: Date.now },
  payment: { type: Boolean, default: false },
  oid: {
    type: String,
    unique: true, // Ensure oid is unique
  },
});

// Pre-save middleware to auto-generate the oid field
orderSchema.pre("save", async function (next) {
  const doc = this;
  if (doc.isNew) {
    const today = new Date();
    const formattedDate = today.toISOString().slice(0, 10).replace(/-/g, ""); // YYYYMMDD format

    // Find the last order created today
    const lastOrder = await mongoose
      .model("order")
      .findOne({ oid: new RegExp(`^${formattedDate}`) })
      .sort({ oid: -1 });

    let sequenceNumber = "001"; // Default sequence number if no previous orders

    if (lastOrder) {
      // Extract the sequence number from the last order's oid
      const lastSequence = parseInt(lastOrder.oid.slice(-3), 10);
      sequenceNumber = (lastSequence + 1).toString().padStart(3, "0");
    }

    // Set the oid field in the format YYYYMMDD001
    doc.oid = `${formattedDate}${sequenceNumber}`;
  }
  next();
});

// Create the order model using the schema
const orderModel =
  mongoose.models.order || mongoose.model("order", orderSchema);

export default orderModel;
