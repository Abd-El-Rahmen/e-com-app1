import { useDispatch, useSelector } from "react-redux";
import img from "../../assets/account3.png";
import { deleteCartItems, fetchAllItems } from "../../store/shop/cartSlice";
import CheckoutItem from "../../components/shopping-view/checkOutItem";
import { useEffect, useState } from "react";
import Address from "../../components/shopping-view/address";
import { createNewOrder } from "../../store/shop/orderSlice";
import { useNavigate } from "react-router-dom";
import { setToastAction } from "../../store/common/featuresSlice";

const initialAddressFormData = {
  address: "",
  city: "",
  phone: "",
  pincode: "",
  notes: "",
};

const ShooppingCheck = () => {
  const [formData, setFormData] = useState(initialAddressFormData);
  const [enableCheckBtn, setEnableCheckBtn] = useState(false);
  const cartItems = useSelector((state) => state.shoppingCart.cartItems);
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const navigate = useNavigate();

  const handleDeleteItem = (productId) => {
    dispatch(deleteCartItems({ userId: user?.id, productId })).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchAllItems(user?.id));
      }
    });
  };

  const isFormValid = () => {
    return Object.keys(formData).every((key) => formData[key].trim() !== "");
  };

  useEffect(() => {
    if (user?.id) {
      dispatch(fetchAllItems(user.id));
    }
  }, [user?.id, dispatch]);

  const subtotal =
    cartItems && cartItems.length > 0
      ? cartItems.reduce((acc, item) => acc + item.salePrice * item.quantity, 0)
      : 0;

  const handlePayment = () => {
    const orderData = {
      userId: user?.id,
      cartItems: cartItems?.map((item) => ({
        productId: item?.productId,
        title: item?.title,
        image: item?.image,
        price: item?.salePrice > 0 ? item?.salePrice : item?.price,
        quantity: item?.quantity,
      })),
      addressInfo: formData,
      totalAmount: subtotal,
      orderDate: new Date(),
      orderUpdateDate: new Date(),
      cartId: cartItems?._id,
    };
    dispatch(createNewOrder(orderData)).then((data) => {
      if (data?.payload?.success) {
        setFormData(initialAddressFormData);
        navigate("/shop/success");
      } else {
        
        dispatch(setToastAction(data?.payload?.message));
        setTimeout(() => dispatch(setToastAction(null)), 3000);
      }
    });
  };

  return (
    <div className="max-w-5xl mx-auto py-8 px-4">
      {/* Header Image */}
      <div className="relative  w-full overflow-hidden">
        <img src={img} className="h-full w-full object-cover object-center" />
      </div>

      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-2/3">
          <Address
            formData={formData}
            setFormData={setFormData}
            isFormValid={isFormValid}
          />
        </div>
        <div className="w-full md:w-1/3">
          {/* Cart Items */}
          <div className="mt-8">
            {cartItems && cartItems.length > 0 ? (
              <div className="overflow-y-auto max-h-[400px] pr-4">
                {cartItems.map((item) => (
                  <CheckoutItem
                    key={item.id}
                    item={item}
                    handleDeleteItem={handleDeleteItem}
                    userId={user?.id}
                  />
                ))}
              </div>
            ) : (
              <p>Your cart is empty.</p>
            )}
          </div>

          {/* Summary Section */}
          <div className="border-t mt-8 pt-4">
            <div className="flex justify-between text-lg font-medium">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <p className="text-sm text-gray-500 mt-1">
              ** Expedited orders cannot be shipped on weekends or to PO boxes.
            </p>

            <div className="flex justify-between items-center mt-6">
              <button className="bg-gray-200 p-2 text-gray-500 rounded">
                Gift card or discount code
              </button>
              <button className="bg-black text-white py-2 px-6 rounded">
                Apply
              </button>
            </div>

            {/* Total */}
            <div className="flex justify-between items-center text-2xl font-bold mt-6">
              <span>Total</span>
              <span>USD ${subtotal.toFixed(2)}</span>
            </div>

            {/* Checkout Button */}
            <div className="mt-6">
              <button
                className={`w-full bg-green-600 text-white py-3 rounded  transition duration-200 cursor-pointer ${
                  !isFormValid() || cartItems.length <= 0
                    ? ""
                    : "hover:bg-green-500"
                }`}
                onClick={() => handlePayment()}
                disabled={!isFormValid() || cartItems.length <= 0}
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShooppingCheck;
