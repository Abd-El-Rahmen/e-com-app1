import Order from "../../models/Order.js";
import Product from "../../models/Product.js";
import Review from "../../models/Review.js";

const addReview = async (req, res) => {
  try {
    const { productId, userId, userName, reviewMessage, reviewValue, date } =
      req.body;

    const order = await Order.findOne({
      userId,
      orderStatus: "delivered",
    });
    const orderProductIds = order?.cartItems?.map(
      (product) => product.productId
    );

    if (!order || !orderProductIds.includes(productId)) {

      return res.json({
        success: false,
        message: "You need to purchase product to review it.",
      });
    }


    const checkExistinfReview = await Review.findOne({
      productId,
      userId,
    });

    if (checkExistinfReview) {
      return res.json({
        success: false,
        message: "You already reviewed this product!",
      });
    }

    const newReview = new Review({
      productId,
      userId,
      userName,
      reviewMessage,
      reviewValue,
      date,
    });

    await newReview.save();

    const reviews = await Review.find({ productId });
    const totalReviewsLength = reviews.length;
    const averageReview =
      reviews.reduce((sum, reviewItem) => sum + reviewItem.reviewValue, 0) /
      totalReviewsLength;

    await Product.findByIdAndUpdate(productId, { averageReview });
    
    res.status(201).json({
      success: true,
      message: 'review added',
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error",
    });
  }
};

const getReviews = async (req, res) => {
  try {
    const { productId } = req.params;

    const reviews = await Review.find({ productId });
    res.status(200).json({
      success: true,
      data: reviews,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error",
    });
  }
};

export { getReviews, addReview };
