import  mongoose  from "mongoose";

const ProductReviewSchema = new mongoose.Schema(
  {
    productId: String,
    userId: String,
    userName: String,
    reviewMessage: String,
    reviewValue: Number,
    date: String
  },
  { timestamps: true }
);

const Review = mongoose.model("ProductReview", ProductReviewSchema);

export default Review