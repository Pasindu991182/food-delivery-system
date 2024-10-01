import express from "express";
import {
  addCustomerMessage,
  listCustomerMessages,
  removeCustomerMessage,
  updateCustomerMessage,
} from "../controllers/contact.message.controller.js";

const customerMessageRouter = express.Router();

customerMessageRouter.post("/add", addCustomerMessage);
customerMessageRouter.get("/list", listCustomerMessages);
customerMessageRouter.delete("/:id", removeCustomerMessage);
customerMessageRouter.put("/:id", updateCustomerMessage);

export default customerMessageRouter;
