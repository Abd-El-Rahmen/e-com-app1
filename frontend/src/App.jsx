import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";
import AuthLayout from "./components/auth/layout";
import AuthLogin from "./pages/auth/login";
import AuthRegister from "./pages/auth/register";
import AdminLayout from "./components/admin-view/layout";
import AdminDashbord from "./pages/admin-view/dashbord";
import AdminOrders from "./pages/admin-view/orders";
import AdminProducts from "./pages/admin-view/products";
import AdminFeatures from "./pages/admin-view/features";
import ShooppingViewLayout from "./components/shopping-view/layout";
import NotFound from "./pages/notFound";
import ShooppingAccount from "./pages/shopping-view/account";
import ShooppingCheck from "./pages/shopping-view/checkOut";
import ShooppingListing from "./pages/shopping-view/listing";
import ShooppingViewHome from "./pages/shopping-view/home";
import CheckAuth from "./components/common/check-auth";
import { useDispatch, useSelector } from "react-redux";
import { checkAuth } from "./store/auth-slice";
import SuccessPayment from "./pages/shopping-view/success";
import Search from "./pages/shopping-view/search";

const App = () => {
  const { toast } = useSelector((state) => state.features);
  const { user, isAuthenticated, isLoading } = useSelector(
    (state) => state.auth
  );

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);
  if (isLoading) return <Skeleton className="w-[800px] h-[600px]  bg-black" />;
  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <div
        className={`fixed bottom-5 right-5  bg-black text-white p-3 rounded shadow-lg z-50 transition-transform  duration-300 ${
          toast !== null ? "translate-x-0" : "translate-x-[2000px]"
        }`}
      >
        {toast}
      </div>

      <Routes>
        <Route
          path="/"
          element={
            <CheckAuth
              isAuthenticated={isAuthenticated}
              user={user}
            ></CheckAuth>
          }
        />
        <Route
          path="/auth"
          element={
            <CheckAuth user={user} isAuthenticated={isAuthenticated}>
              <AuthLayout />
            </CheckAuth>
          }
        >
          <Route path="login" element={<AuthLogin />} />
          <Route path="register" element={<AuthRegister />} />
        </Route>
        <Route
          path="/admin"
          element={
            <CheckAuth user={user} isAuthenticated={isAuthenticated}>
              <AdminLayout />
            </CheckAuth>
          }
        >
          <Route path="dashboard" element={<AdminDashbord />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="features" element={<AdminFeatures />} />
        </Route>
        <Route
          path="/shop"
          element={
            <CheckAuth user={user} isAuthenticated={isAuthenticated}>
              <ShooppingViewLayout />
            </CheckAuth>
          }
        >
          <Route path="search" element={<Search />} />
          <Route path="success" element={<SuccessPayment />} />
          <Route path="account" element={<ShooppingAccount />} />
          <Route path="checkout" element={<ShooppingCheck />} />
          <Route path="listing" element={<ShooppingListing />} />
          <Route path="home" element={<ShooppingViewHome />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;
