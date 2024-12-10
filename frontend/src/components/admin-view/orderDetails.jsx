import { X } from "lucide-react";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateOrderStatus } from "../../store/admin/orderSlice";
import { setToastAction } from "../../store/common/featuresSlice";

const AdminOrderDetails = ({ setOpenDetailsDialog, order }) => {
  const statusOptions = [
    { id: "pending", label: "Pending" },
    { id: "inProcess", label: "In Process" },
    { id: "delivered", label: "Delivered" },
    { id: "rejected", label: "Rejected" },
  ];

  const [status, setStatus] = useState(order.orderStatus);
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setStatus(e.target.value);
    console.log(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (status) {
      console.log(order?._id);
      dispatch(updateOrderStatus({ orderId: order?._id, status: status })).then(
        (data) => {
          if (data?.payload?.success) {
            dispatch(setToastAction(data?.payload?.message));
            setTimeout(() => dispatch(setToastAction(null)), 3000);
            setOpenDetailsDialog(false);
          }
        }
      );
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-20">
      <div className="bg-white w-2/3 md:w-2/5 relative flex flex-col md:flex-row overflow-y-auto max-h-[600px] md:max-h-full items-center gap-8 rounded-lg shadow-lg p-10 justify-between z-30">
        <button
          className="absolute top-3 right-3"
          onClick={() => setOpenDetailsDialog(false)}
        >
          <X />
        </button>
        <div className="flex flex-col p-2 w-full">
          <div className="grid gap-4 border-b-2 pb-4">
            <div className="grid gap-2">
              <h2 className="text-xl font-bold">Order Details:</h2>
              <ul className="grid gap-3">
                {order?.cartItems?.map((product) => (
                  <li
                    key={product._id}
                    className="flex items-center justify-between"
                  >
                    <span className="font-semibold text-lg">
                      {product?.title}
                    </span>
                    <span>{product?.price}$</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <br />

          <div className="grid gap-4 border-b-2 pb-4 mb-4">
            <div className="grid gap-2">
              <h2 className="text-xl font-bold">User Info:</h2>
              <ul className="grid gap-3">
                <li className="flex items-center justify-between">
                  <span className="font-semibold text-lg">User ID :</span>
                  <span>{order.userId}</span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="font-semibold text-lg">Address:</span>
                  <span>{order.addressInfo.address}</span>
                </li>
              </ul>
            </div>
          </div>

          <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
            <select
              className="border-2 border-black rounded-lg p-2 cursor-pointer"
              name="status"
              id="status"
              value={status}
              onChange={handleChange}
            >
              {statusOptions.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.label}
                </option>
              ))}
            </select>
            <button
              type="submit"
              className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition duration-200"
            >
              Save Status
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminOrderDetails;
