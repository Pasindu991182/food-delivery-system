import mongoose from "mongoose";

// Define the schema for DeliveryPerson
const deliveryPersonSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  nic: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  age: { type: Number, required: true },
  vehicleType: { type: String, enum: ["bike", "wheel"], required: true },
  address: { type: String, required: true },
  did: {
    type: String,
    unique: true, // Ensure did is unique
  },
});

// Pre-save middleware to auto-generate the did field
deliveryPersonSchema.pre("save", async function (next) {
  const doc = this;
  if (doc.isNew) {
    const today = new Date();
    const formattedDate = today.toISOString().slice(0, 10).replace(/-/g, ""); // YYYYMMDD format

    // Find the last delivery person created today
    const lastPerson = await mongoose
      .model("DeliveryPerson")
      .findOne({ did: new RegExp(`^${formattedDate}`) })
      .sort({ did: -1 });

    let sequenceNumber = "001"; // Default sequence number if no previous delivery persons

    if (lastPerson) {
      // Extract the sequence number from the last person's did
      const lastSequence = parseInt(lastPerson.did.slice(-3), 10);
      sequenceNumber = (lastSequence + 1).toString().padStart(3, "0");
    }

    // Set the did field in the format YYYYMMDD001
    doc.did = `${formattedDate}${sequenceNumber}`;
  }
  next();
});

// Create the DeliveryPerson model using the schema
const DeliveryPersonModel = mongoose.model(
  "DeliveryPerson",
  deliveryPersonSchema
);

export default DeliveryPersonModel;
