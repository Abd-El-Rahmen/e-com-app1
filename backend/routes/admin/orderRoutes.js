import express from "express";
import { updateOrderStatus,getAllOrders } from "../../controllers/admin/orderController.js";

const router = express.Router();

router.put("/update", updateOrderStatus);
router.get("/list", getAllOrders);

export default router;
