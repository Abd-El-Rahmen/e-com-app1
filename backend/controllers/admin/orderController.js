import Cart from "../../models/Cart.js";
import Order from "../../models/Order.js";
import Product from "../../models/Product.js";

const updateOrderStatus = async (req, res) => {
  try {
    const {
      orderId,
      status
    } = req.body;
    
    const findOrder = await Order.findById(orderId)

    if(!findOrder) {
        res.status(404).json({
            success:false,
            message: 'Order Not Found'
        })
    }

    findOrder.orderStatus = status
    
    await findOrder.save();


    res.status(200).json({
      success: true,
      message: "Order Status Updated",
    });
    
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Some error occured!",
    });
  }
};


const getAllOrders = async (req, res) => {
  try {

    const orders = await Order.find({}) ;

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

export { getAllOrders, updateOrderStatus };
