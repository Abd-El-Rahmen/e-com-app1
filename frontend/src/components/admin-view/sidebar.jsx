import {
  BadgeCheck,
  ChartNoAxesCombined,
  LayoutDashboard,
  ShoppingBasket,
  CircleX,
} from "lucide-react";
import { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const adminSidebarMenuItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    path: "/admin/dashboard",
    icon: <LayoutDashboard />,
  },
  {
    id: "products",
    label: "Products",
    path: "/admin/products",
    icon: <ShoppingBasket />,
  },
  {
    id: "orders",
    label: "Orders",
    path: "/admin/orders",
    icon: <BadgeCheck />,
  },
];

function MenuItems({ smallScreen, setOpen }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [currentItem, setCurrentItem] = useState();

  useEffect(() => {
    const currentMenuItem = adminSidebarMenuItems.find(
      (item) => item.path === location.pathname
    );
    if (currentMenuItem) {
      setCurrentItem(currentMenuItem.id);
    }
  }, [location.pathname, adminSidebarMenuItems]);
  const handleMenuItemClick = (path, id) => {
    navigate(path);
    setCurrentItem(id);
    if (smallScreen) setOpen(false);
  };

  return (
    <nav className=" mt-8 flex-col flex gap-2">
      {adminSidebarMenuItems.map(({ id, label, path, icon }) => (
        <div
          key={id}
          onClick={() => handleMenuItemClick(path, id)}
          className={`flex cursor-pointer text-xl items-center gap-2 rounded-md px-3 py-2 text-muted-foreground hover:bg-muted hover:text-foreground ${
            id === currentItem ? "bg-muted text-foreground" : ""
          }`}
        >
          {icon}
          <span>{label}</span>
        </div>
      ))}
    </nav>
  );
}

function AdminSideBar({ smallScreen, open, setOpen }) {
  const navigate = useNavigate();

  return (
    <Fragment>
      <aside
        className={`fixed z-20 left-0 top-0 w-64 h-full border-r bg-background p-6 transition-transform ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center">
          <div
            onClick={() => navigate("/admin/dashboard")}
            className="flex cursor-pointer items-center gap-2"
          >
            <ChartNoAxesCombined size={30} />
            <h1 className="text-2xl font-extrabold">Admin Panel</h1>
          </div>
          {smallScreen && (
            <CircleX
              className="cursor-pointer"
              onClick={() => setOpen(false)}
              size={24}
            />
          )}
        </div>
        <MenuItems smallScreen={smallScreen} setOpen={setOpen} />
      </aside>
    </Fragment>
  );
}

export default AdminSideBar;
