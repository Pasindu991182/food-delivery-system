import express from "express";
import authMiddleware from "../middleware/auth.js";
import {
  deleteOrder,
  listOrders,
  placeOrder,
  updateOrder,
  updateStatus,
  userOrder,
  verifyOrder,
} from "../controllers/orderController.js";

const orderRouter = express.Router();

orderRouter.post("/place", authMiddleware, placeOrder);
orderRouter.post("/", placeOrder);
orderRouter.post("/verify", verifyOrder);
orderRouter.post("/userorders", authMiddleware, userOrder);
orderRouter.get("/list", listOrders);
orderRouter.post("/status", updateStatus);
orderRouter.delete("/:id", deleteOrder);
orderRouter.put("/:id", updateOrder);

export default orderRouter;
