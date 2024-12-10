import { X } from "lucide-react";
import React from "react";

const ShoppingOrderDetails = ({ setOpenDetailsDialog, order,user }) => {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-20">
      <div className="bg-white w-2/3 md:w-2/5 relative flex flex-col  md:flex-row overflow-y-auto max-h-[600px] md:max-h-full items-center gap-8 rounded-lg shadow-lg  p-10 justify-between z-30">
        <button
          className="absolute top-3 right-3"
          onClick={() => {setOpenDetailsDialog(false) }}
        >
          {" "}
          <X />
        </button>
        <div className="flex flex-col p-2 w-full">
          <div className="grid gap-4 border-b-2 pb-4">
            <div className="grid gap-2">
              <h2 className="text-xl font-bold">Order Details:</h2>
              <ul className="grid gap-3">
                {order?.cartItems?.map((product) => (
                  <li className="flex items-center justify-between">
                    <span className="font-semibold text-lg">{product?.title}</span>
                    <span>{product?.price}$</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <br />

          <div className="grid gap-4">
            <div className="grid gap-2">
              <h2 className="text-xl font-bold">User Info:</h2>
              <ul className="grid gap-3">
                <li className="flex items-center justify-between">
                  <span className="font-semibold text-lg">Username:</span>
                  <span>{user?.userName}</span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="font-semibold text-lg">Email:</span>
                  <span>{user?.email}</span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="font-semibold text-lg">Address:</span>
                  <span>{order.addressInfo.address}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingOrderDetails;
