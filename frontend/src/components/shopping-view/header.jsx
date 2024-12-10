import {
  Menu,
  CircleX,
  ShoppingCart,
  Search,
  UserCog,
  LogOut,
} from "lucide-react";
import { Fragment, useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { shoppingViewHeaderMenuItems } from "../../config";
import { AvatarFallback } from "../ui/avatar";
import { Avatar } from "@radix-ui/react-avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu.tsx";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../store/auth-slice";
import { fetchAllItems } from "../../store/shop/cartSlice";
import CartWrapper from "./cartWrapper";
import ProductDetails from "./productDetails";
import { getProductDetails } from "../../store/shop/productSlice";

const ShoppingViewHeader = () => {
  const [openProductDetails, setOpenProductDetails] = useState(false);
  const [productDetails, setProductDetails] = useState(null);
  const cartItems = useSelector((state) => state.shoppingCart.cartItems);
  const [openSidebar, setOpenSidebar] = useState(false);
  const [openCartSidebar, setOpenCartSidebar] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchedItems, setSearchedItems] = useState([]);
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const toggleSidebar = () => setOpenSidebar((prev) => !prev);
  const productList = useSelector((state) => state.shoppingProduct.productList);

  useEffect(() => {
    if (productDetails) setOpenProductDetails(true);
  }, [productDetails]);

  function searchItems(items, query) {
    if (!query) return [];

    const lowerCaseQuery = query.toLowerCase();
    return items.filter((item) =>
      item.title.toLowerCase().includes(lowerCaseQuery)
    );
  }

  const handleOnChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    const searchedItems = searchItems(productList, value);
    setSearchedItems(searchedItems);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && searchQuery.trim()) {
      navigate(`/shop/search?query=${encodeURIComponent(searchQuery)}`);
      setSearchQuery(""); 
      setSearchedItems([])
    }
  };

  const handleAddToCart = (currentProductId) => {
    dispatch(
      addToCart({
        userId: user?.id,
        productId: currentProductId,
        quantity: 1,
      })
    );
    dispatch(fetchAllItems(user?.id));
  };

  const toggleCartSidebar = () => setOpenCartSidebar((prev) => !prev);

  useEffect(() => {
    if (user?.id) {
      dispatch(fetchAllItems(user.id));
    }
  }, [user?.id]);

  const UserAvatar = ({ user }) => {
    const handleLogout = () => {
      dispatch(logoutUser());
    };

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar>
            <AvatarFallback className="bg-black text-white text-xl rounded-full w-10 h-10 cursor-pointer">
              {user?.userName[0].toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          side="right"
          className="w-60 m-3 bg-slate-100 p-3 rounded-md"
        >
          <DropdownMenuLabel
            onClick={() => navigate("/shop/account")}
            className="flex gap-x-3 p-2 mb-2 text-xl font-bold"
          >
            <Avatar>
              <AvatarFallback className="bg-black text-white text-lg rounded-full w-8 h-8 cursor-pointer">
                {user?.userName[0].toUpperCase()}
              </AvatarFallback>
            </Avatar>{" "}
            {user?.userName}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => navigate("/shop/account")}
            className="flex items-center p-2 mb-1 cursor-pointer hover:bg-slate-50"
          >
            <UserCog className="mr-2 h-4 w-4" />
            Account
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={handleLogout}
            className="flex items-center p-2 mb-1 cursor-pointer hover:bg-slate-50"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  };

  return (
    <Fragment>
      <header className="flex justify-between items-center px-6 py-4 bg-white border-b border-gray-300">
        <div className="flex items-center gap-4">
          <button className="w-10 h-10" onClick={toggleSidebar}>
            <Menu />
          </button>
          <h1
            className="text-2xl font-extrabold cursor-pointer"
            onClick={() => navigate("/shop/home")}
          >
            MyShop
          </h1>
        </div>
        <div className="relative hidden md:flex items-center justify-around gap-3 bg-gray-200 rounded-3xl px-4 py-2 w-60 md:w-96">
          <div className="flex items-center flex-1 ">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={handleOnChange}
              className="border-hidden outline-none px-2 py-1 bg-transparent flex-1"
              onKeyPress={handleKeyPress}
            />
          </div>
          <Search className="w-5 h-5 text-gray-600" />
          {searchedItems.length > 0 && (
            <div className="absolute top-12 z-10 w-full bg-white border rounded-lg shadow-lg mt-1 max-h-60 overflow-y-auto">
              {searchedItems.map((item) => (
                <div
                  key={item.id}
                  className="block px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    setSearchedItems([])
                    setSearchQuery("");
                    dispatch(getProductDetails({id:item._id}))
                    
                  }}
                >
                  {item.title}
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="flex gap-3 items-center">
          <button
            onClick={() => {
              toggleCartSidebar();
              dispatch(fetchAllItems(user.id));
            }}
            className="text-2xl hover:text-gray-600"
          >
            <ShoppingCart size={30} />
          </button>
          {isAuthenticated && <UserAvatar user={user} />}
        </div>
      </header>

      {openSidebar && (
        <div
          className="fixed inset-0 z-10 bg-black opacity-50"
          onClick={toggleSidebar}
        />
      )}

      <aside
        className={`fixed overflow-y-auto z-20 left-0 top-0 w-60 h-full border-l bg-background p-6 transition-transform transform ${
          openSidebar ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col gap-y-6">
          <button className="self-end" onClick={toggleSidebar}>
            <CircleX />
          </button>
          {shoppingViewHeaderMenuItems.map((item) => (
            <Link
              key={item.id}
              to={item.path}
              className="text-md font-bold hover:text-gray-400"
              onClick={toggleSidebar}
            >
              <span className="font-bold text-xl">{item.label}</span>
            </Link>
          ))}
        </div>
      </aside>

      {openCartSidebar && (
        <div
          className="fixed inset-0 z-10 bg-black opacity-50"
          onClick={toggleCartSidebar}
        />
      )}

      <aside
        className={`fixed right-0 z-20 top-0 w-96 h-full border-l overflow-y-auto bg-white p-6 transition-transform transform ${
          openCartSidebar ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col gap-y-6">
          <div className="flex justify-between">
            <h2 className="text-xl font-bold">Cart Items</h2>
            <button onClick={toggleCartSidebar}>
              <CircleX />
            </button>
          </div>

          <CartWrapper
            cartItems={cartItems && cartItems.length > 0 ? cartItems : []}
            userId={user?.id}
            setOpenCartSidebar={setOpenCartSidebar}
          />
        </div>
      </aside>
      {openProductDetails && (
        <ProductDetails
          product={productDetails}
          open={openProductDetails}
          setOpen={setOpenProductDetails}
          handleAddToCart={() => handleAddToCart(product?._id)}
        />
      )}
    </Fragment>
  );
};

export default ShoppingViewHeader;
