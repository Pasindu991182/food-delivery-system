import express from "express";
import {
  createDeliveryPerson,
  getAllDeliveryPersons,
  updateDeliveryPerson,
  deleteDeliveryPerson,
  loginDeliveryPerson,
} from "../controllers/deliveryPersonController.js";

const deliveryPersonRouter = express.Router();

deliveryPersonRouter.post("/", createDeliveryPerson);
deliveryPersonRouter.get("/", getAllDeliveryPersons);
deliveryPersonRouter.put("/:id", updateDeliveryPerson);
deliveryPersonRouter.delete("/:id", deleteDeliveryPerson);
deliveryPersonRouter.post("/login", loginDeliveryPerson);

export default deliveryPersonRouter;
