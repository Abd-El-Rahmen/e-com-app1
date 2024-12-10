import {
  addToCart,
  updateCart,
  fetchCartItems,
  deleteCartItem,
} from "../../controllers/shop/cart-controller.js";
import express from "express";

const router = express.Router();

router.post("/add", addToCart);
router.put("/update", updateCart);
router.delete("/delete/:userId/:productId", deleteCartItem);
router.get("/all/:userId", fetchCartItems);

export default router;
