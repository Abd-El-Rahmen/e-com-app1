import { useState } from "react";
import { useSelector } from "react-redux";
import accImg from "../../assets/account.jpg";
import ShoppingOrders from "@/components/shopping-view/orders";
import UpdateInfo from "../../components/auth/updateInfo";

const sections = [
  { id: "profile", label: "My Profile" },
  { id: "orders", label: "Orders" },
];

function ShoppingAccount() {
  const { user } = useSelector((state) => state.auth);
  const [accountSection, setAccountSection] = useState(sections[0].id);

  return (
    <div className="mx-auto px-4 max-w-5xl">
      <div className="relative h-[300px] w-full overflow-hidden mb-10">
        <img
          src={accImg}
          className="h-full w-full object-cover object-center"
        />
      </div>
      <div>
        <div className="flex gap-1 rounded-lg h-12 bg-gray-100">
          {sections.map((section) => (
            <div
              className={`py-3 px-5 cursor-pointer rounded-lg ${accountSection === section.id ? 'bg-gray-200' : 'hover:bg-gray-200'}`}
              onClick={() => setAccountSection(section.id)}
            >
              {section.label}
            </div>
          ))}
        </div>
        <div className="p-3">
          {accountSection === "profile" && (
            <UpdateInfo user={user ? user : {}} />
          )}
          {accountSection === "orders" && <ShoppingOrders />}
        </div>
      </div>
    </div>
  );
}

export default ShoppingAccount;
