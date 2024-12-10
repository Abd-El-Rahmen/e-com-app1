import React, { useEffect, useState } from "react";
import AdminOrderDetails from "../../components/admin-view/orderDetails";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrders } from "../../store/admin/orderSlice";

const AdminOrders = () => {
  const { orderList } = useSelector((state) => state.adminOrder);

  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllOrders());
  }, [dispatch]);

  const handleViewDetails = (order) => {
    setSelectedOrder(order);
    setOpenDetailsDialog(true);
  };

  return (
    <div className="m-0 lg:ml-60">
      <h2 className="text-2xl font-bold m-4">Order History</h2>
      <div className="p-2 overflow-x-auto">
        <table className="w-full divide-x divide-gray-200">
          <thead className="bg-green-500 text-white">
            <tr >
              <th className="px-6 py-3 text-left text-sm font-medium">
                Order ID
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium">
                Order Date
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium">
                Order Status
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium">
                Order Price
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium">
                <span className="sr-only">Details</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {orderList?.length > 0 &&
              orderList.map((order, index) => (
                <tr key={index} className="hover:bg-gray-100 ">
                  <td className="px-4 py-4 text-sm whitespace-nowrap">
                    {order._id}
                  </td>
                  <td className="px-4 py-4 text-sm whitespace-nowrap">
                    {order.orderDate}
                  </td>
                  <td className="px-4 py-4 text-sm whitespace-nowrap">
                    {order.totalAmount}$
                  </td>
                  <td className="px-4 py-4 text-sm whitespace-nowrap">
                    {order.orderStatus}
                  </td>
                  <td className="px-4 py-4 text-sm whitespace-nowrap">
                    <button
                      className="bg-green-500 text-white py-1 px-3 rounded hover:bg-green-600"
                      onClick={() => handleViewDetails(order)}
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      {openDetailsDialog && (
        <AdminOrderDetails
          setOpenDetailsDialog={setOpenDetailsDialog}
          order={selectedOrder}
        />
      )}
    </div>
  );
};

export default AdminOrders;
