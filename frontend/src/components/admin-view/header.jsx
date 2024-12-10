import { AlignJustify, LogOut } from "lucide-react";
import { useDispatch } from "react-redux";
import { logoutUser } from "@/store/auth-slice";

function AdminHeader({ open, setOpen }) {
  const dispatch = useDispatch();

  function handleLogout() {
    dispatch(logoutUser());
  }

  return (
    <header className="flex items-center justify-between px-4 py-3 bg-background border-b">
      <button onClick={() => setOpen(true)} className={`lg:hidden ${open ? 'hidden' : 'sm:block'}`}>
        <AlignJustify />
        <span className="sr-only">Toggle Menu</span>
      </button>
      <div className="flex flex-1 justify-end">
        <button
          onClick={handleLogout}
          className="w-fit flex bg-black text-white p-3 rounded hover:bg-gray-800 transition duration-200"
        >
          <LogOut />
          Logout
        </button>
      </div>
    </header>
  );
}

export default AdminHeader;