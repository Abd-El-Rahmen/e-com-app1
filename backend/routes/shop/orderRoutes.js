import express from "express";
import { createOrder,getAllOrdersByUser } from "../../controllers/shop/order-controller.js";

const router = express.Router();

router.post("/create", createOrder);
router.get("/list/:userId", getAllOrdersByUser);

export default router;
