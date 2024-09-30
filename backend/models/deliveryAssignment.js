import mongoose from "mongoose";

// Define the schema for DeliveryAssignment
const deliveryAssignmentSchema = new mongoose.Schema({
  orderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "order",
    required: true,
  },
  deliveryPersonId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "DeliveryPerson",
    required: true,
  },
  assignedAt: { type: Date, default: Date.now },
  status: {
    type: String,
    enum: ["Assigned", "Completed"],
    default: "Assigned",
  },
  did: {
    type: String,
    unique: true, // Ensure did is unique
  },
});

// Pre-save middleware to auto-generate the did field
deliveryAssignmentSchema.pre("save", async function (next) {
  const doc = this;
  if (doc.isNew) {
    const today = new Date();
    const formattedDate = today.toISOString().slice(0, 10).replace(/-/g, ""); // YYYYMMDD format

    // Find the last delivery assignment created today
    const lastAssignment = await mongoose
      .model("DeliveryAssignment")
      .findOne({ did: new RegExp(`^${formattedDate}`) })
      .sort({ did: -1 });

    let sequenceNumber = "001"; // Default sequence number if no previous assignments

    if (lastAssignment) {
      // Extract the sequence number from the last assignment's did
      const lastSequence = parseInt(lastAssignment.did.slice(-3), 10);
      sequenceNumber = (lastSequence + 1).toString().padStart(3, "0");
    }

    // Set the did field in the format YYYYMMDD001
    doc.did = `${formattedDate}${sequenceNumber}`;
  }
  next();
});

// Create the DeliveryAssignment model using the schema
const DeliveryAssignment = mongoose.model(
  "DeliveryAssignment",
  deliveryAssignmentSchema
);

export default DeliveryAssignment;
