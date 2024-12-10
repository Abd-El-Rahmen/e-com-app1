import { Outlet } from "react-router-dom";
import AdminSideBar from "./sidebar";
import AdminHeader from "./header";
import { useState, useEffect } from "react";
import useWindowWidth from "../../hooks/window-width";



function AdminLayout() {
  const windowWidth = useWindowWidth();
  const [openSidebar, setOpenSidebar] = useState(windowWidth >= 1024);

  useEffect(() => {
    setOpenSidebar(windowWidth >= 1024);
  }, [windowWidth]);

  return (
    <div className="flex flex-col lg:flex-row min-h-screen w-full">
      {/* Admin Sidebar: Render only on larger screens */}
      {openSidebar && (
        <AdminSideBar
          smallScreen={windowWidth <= 1024}
          open={openSidebar}
          setOpen={setOpenSidebar}
          className="w-full lg:w-60"
        />
      )}
      <div className="flex flex-1 flex-col">
        {/* Admin Header */}
        <AdminHeader open={openSidebar} setOpen={setOpenSidebar} />
        <main className="flex-1 flex flex-col bg-muted/40 p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
