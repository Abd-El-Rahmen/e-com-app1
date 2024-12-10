import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
  userId: String,
  cartItems: [
    {
      productId: String,
      title: String,
      image: String,
      price: String,
      quantity: Number,
    },
  ],
  addressInfo: {
    address: String,
    city: String,
    pincode: String,
    phone: String,
    notes: String,
  },
  totalAmount: Number,
  orderDate: Date,
  orderUpdateDate: Date,
  orderStatus: String
});

const Order = mongoose.model("Order", OrderSchema);

export default Order;
