import Cart from "../../models/Cart.js";
import Order from "../../models/Order.js";
import Product from "../../models/Product.js";

const createOrder = async (req, res) => {
  try {
    const {
      userId,
      cartItems,
      addressInfo,
      totalAmount,
      orderDate,
      orderUpdateDate,
    } = req.body;

    const newOrder = new Order({
      userId,
      cartItems,
      addressInfo,
      totalAmount,
      orderDate,
      orderUpdateDate,
      orderStatus: 'pending'
    });

    for (let item of cartItems) {
      let product = await Product.findById(item.productId);

      if (!product) {
        return res.json({
          success: false,
          message: `There is no product called ${product.title}`,
        });
      }
      if ((product.totalStock - item.quantity) < 0) {
        return res.json({
          success: false,
          message: `Not enough stock for ${product.title}`,
        });
      }
      product.totalStock -= item.quantity;

      await product.save();
    }

    await newOrder.save();

    await Cart.findOneAndDelete({});

    res.status(200).json({
      success: true,
      message: "Order Saved",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Some error occured!",
    });
  }
};


const getAllOrdersByUser = async (req, res) => {
  try {
    const {userId}  = req.params;

    const orders = await Order.find({ userId });

    if (!orders.length) {
      return res.status(404).json({
        success: false,
        message: "No orders found!",
      });
    }

    res.status(200).json({
      success: true,
      data: orders,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured!",
    });
  }
};

export { createOrder, getAllOrdersByUser };
