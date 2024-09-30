// routes/deliveryRoutes.js

import express from "express";
import {
  getOutForDeliveryOrders,
  createDeliveryAssignment,
  getAllDeliveryAssignments,
  getDeliveryAssignmentById,
  updateDeliveryAssignment,
  deleteDeliveryAssignment,
} from "../controllers/deliveryController.js";

const router = express.Router();

router.get("/out-for-delivery", getOutForDeliveryOrders);
router.post("/assignments", createDeliveryAssignment);
router.get("/assignments", getAllDeliveryAssignments);
router.get("/assignments/:id", getDeliveryAssignmentById);
router.put("/assignments/:id", updateDeliveryAssignment);
router.delete("/assignments/:id", deleteDeliveryAssignment);

export default router;
