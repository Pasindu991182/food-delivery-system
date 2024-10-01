// Import mongoose
import mongoose from "mongoose";

// Destructure Schema from mongoose
const { Schema } = mongoose;

// Define the schema for ContactMessage
const contactMessageSchema = new Schema(
  {
    message: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: ["pending", "resolved"],
      default: "pending",
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    email: {
      type: String,
      required: true,
      match: [/.+\@.+\..+/, "Please enter a valid email address"],
    },
    cid: {
      type: String,
      unique: true, // Ensure cid is unique
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt timestamps
  }
);

// Pre-save middleware to auto-generate the cid field
contactMessageSchema.pre("save", async function (next) {
  const doc = this;
  if (doc.isNew) {
    const today = new Date();
    const formattedDate = today.toISOString().slice(0, 10).replace(/-/g, ""); // YYYYMMDD format

    // Find the last message created today
    const lastMessage = await mongoose
      .model("ContactMessage")
      .findOne({ cid: new RegExp(`^${formattedDate}`) })
      .sort({ cid: -1 });

    let sequenceNumber = "001"; // Default sequence number if no previous messages

    if (lastMessage) {
      // Extract the sequence number from the last message's cid
      const lastSequence = parseInt(lastMessage.cid.slice(-3), 10);
      sequenceNumber = (lastSequence + 1).toString().padStart(3, "0");
    }

    // Set the cid field in the format YYYYMMDD001
    doc.cid = `${formattedDate}${sequenceNumber}`;
  }
  next();
});

// Create the ContactMessage model using the schema
const ContactMessage = mongoose.model("ContactMessage", contactMessageSchema);

// Export the model
export default ContactMessage;
