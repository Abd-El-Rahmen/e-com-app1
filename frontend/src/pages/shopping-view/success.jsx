import { BookmarkCheck } from "lucide-react";
import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { setFalseSuccess } from "../../store/shop/orderSlice";

const SuccessPayment = () => {
  const { successPayment } = useSelector((state) => state.shopOrder);
  const navigate = useNavigate();
  return (
    <div className="w-full flex justify-center py-14">
      {successPayment ? (
        <div className="max-w-5xl bg-gray-30 p-10 flex flex-col items-center gap-5 ">
          <h2 className="font-bold text-2xl md:text-4xl ">
            Payment Successful
          </h2>
          <BookmarkCheck size={120} />
          <p className="text-gray-400 font-semibold">
            Your payment has been completed
          </p>
          <button
            onClick={() => {
              navigate("/shop/home");
              setFalseSuccess();
            }}
            className="w-2/3 rounded-lg py-3 bg-indigo-700 text-white"
          >
            Finish
          </button>
        </div>
      ) : (
        <Navigate to={"/shop/home"} />
      )}
    </div>
  );
};

export default SuccessPayment;
