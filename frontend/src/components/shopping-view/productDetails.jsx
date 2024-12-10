import { StarIcon, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setProductDetails } from "../../store/shop/productSlice";
import { getReviews, addReview } from "../../store/shop/reviewSlice";
import { setToastAction } from "../../store/common/featuresSlice";

const ProductDetails = ({ product, handleAddToCart, setOpen }) => {
  const dispatch = useDispatch();
  const { reviews } = useSelector((state) => state.reviews);
  const { user } = useSelector((state) => state.auth);

  const [reviewMessage, setReviewMessage] = useState("");
  const [reviewValue, setReviewValue] = useState(5); 
  const date = new Date().toISOString().split("T")[0]; 

  useEffect(() => {
    dispatch(getReviews(product._id));
  }, [dispatch, product.id]);

  const handleCloseDialogue = () => {
    dispatch(setProductDetails());
    setOpen(false);
  };

  const handleAddReview = (e) => {
    e.preventDefault();

    if (!reviewMessage) return;

    const reviewData = {
      productId: product?._id,
      userId: user?.id,
      userName: user?.userName,
      reviewMessage,
      reviewValue,
      date,
    };

    dispatch(addReview(reviewData)).then((data) => {
      dispatch(getReviews(product._id))
      dispatch(setToastAction(data?.payload?.message));
      setTimeout(() => dispatch(setToastAction(null)), 3000);
    });
    setReviewMessage("");
    setReviewValue(5);
  };
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-20">
      <div className="bg-white relative flex flex-col md:flex-row overflow-y-auto max-h-[600px] md:max-h-full items-center gap-8 rounded-lg shadow-lg p-6 justify-between z-30">
        <button
          className="absolute top-3 right-3"
          onClick={handleCloseDialogue}
        >
          <X size={30} />
        </button>
        <img
          src={product.image}
          alt={product.title}
          className="rounded-lg shadow-lg h-60 w-60 self-center md:w-96 md:h-96 md:self-start"
        />
        <div>
          <h1 className="text-3xl font-bold mt-4">{product.title}</h1>
          <p className="mt-2 text-gray-700">{product.description}</p>
          <div className="flex justify-between items-center mt-4">
            <span className="text-3xl font-bold text-green-600">
              ${product.salePrice}
            </span>
            <span className="text-3xl ml-4 text-gray-500 line-through">
              ${product.price}
            </span>
          </div>
          <div className="flex items-center gap-2 mt-2">
            <div className="flex items-center gap-0.5">
              {Array.from({ length: Math.round(product.averageReview) }).map(
                (_, index) => (
                  <StarIcon key={index} className="w-3 h-3 fill-primary" />
                )
              )}
            </div>
            <span className="text-muted-foreground">{"{4.5}"}</span>
          </div>

          <button
            className="mt-6 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300 w-full"
            onClick={(e) => {
              e.stopPropagation();
              handleAddToCart(product._id);
            }}
          >
            Add to Cart
          </button>
          <h2 className="text-2xl font-bold my-2">Reviews</h2>
          <div className="pl-2 overflow-y-auto max-h-40 mb-2">
            {reviews?.length > 0 &&
              reviews.map((review) => (
                <div key={review._id} className="flex gap-2 items-start h-20">
                  <div className="bg-black rounded-full w-8 h-8 flex items-center justify-center">
                    <span className="text-white text-sm">
                      {review.userName.substring(0, 1).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <span className="text-lg font-semibold">
                      {review.userName}
                    </span>
                    <div className="flex gap-2">
                      <div className="flex items-center gap-0.5">
                        {Array.from({
                          length: Math.round(review.reviewValue),
                        }).map((_, index) => (
                          <StarIcon
                            key={index}
                            className="w-3 h-3 fill-primary"
                          />
                        ))}
                      </div>
                      <span className="text-sm">{review.date}</span>
                    </div>
                    <p className="mt-1 text-gray-500">{review.reviewMessage}</p>
                  </div>
                </div>
              ))}
          </div>
          <form className="flex gap-2" onSubmit={handleAddReview}>
            <select
              value={reviewValue}
              onChange={(e) => setReviewValue(Number(e.target.value))}
              className="h-14 border-2 p-2 rounded-lg"
            >
              <option value={1}>1 Star</option>
              <option value={2}>2 Stars</option>
              <option value={3}>3 Stars</option>
              <option value={4}>4 Stars</option>
              <option value={5}>5 Stars</option>
            </select>
            <input
              type="text"
              className="h-14 border-2 p-2 w-2/3 rounded-lg"
              placeholder="Write a review..."
              value={reviewMessage}
              onChange={(e) => setReviewMessage(e.target.value)}
            />
            <button
              type="submit"
              className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
