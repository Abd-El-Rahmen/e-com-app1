import React, { useEffect, useRef, useState } from "react";
import { useToast } from "../../hooks/use-toast";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewAddress,
  deleteAddress,
  editAddress,
  fetchAllAddresses,
} from "../../store/shop/addressSlice";
import { ArrowUpDown, X } from "lucide-react";



const Address = ({ formData, setFormData,isFormValid }) => {
  const { addressList } = useSelector((state) => state.shopAddress);
  const { toast } = useToast();
  const [error, setError] = useState("");
  const { user } = useSelector((state) => state.auth);
  const chooseAddRef = useRef(null);

  const dispatch = useDispatch();
  const [currentEditAddress, setCurrentEditAddress] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    if (currentEditAddress === null) {
      if (addressList.length >= 3) {
        setError("You can add only 3 addresses");
        return;
      }
      if (!isFormValid()) {
        setError("All fields are required!");
        return;
      }
      dispatch(addNewAddress({ ...formData, userId: user?.id })).then(
        (data) => {
          if (data?.payload?.success) {
            dispatch(fetchAllAddresses(user?.id));
            toast({ title: "Address saved successfully!" });
          }
        }
      );
    } else {
      dispatch(
        editAddress({
          userId: user?.id,
          addressId: currentEditAddress,
          formData,
        })
      ).then((data) => {
        if (data?.payload?.success) {
          dispatch(fetchAllAddresses(user?.id));
          setCurrentEditAddress(null);
          toast({ title: "Address updated successfully!" });
        }
      });
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        chooseAddRef.current &&
        !chooseAddRef.current.contains(event.target)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    dispatch(fetchAllAddresses(user?.id));
  }, [dispatch, user?.id]);

  const handleEditAddress = (address) => {
    setCurrentEditAddress(address?._id);
    setFormData({
      address: address.address,
      city: address.city,
      phone: address.phone,
      pincode: address.pincode,
      notes: address.notes,
    });
    
    setIsDropdownOpen(false);
  };

  const handleDeleteAddress = (id) => {
    dispatch(deleteAddress({ userId: user?.id, addressId: id })).then(() => {
      dispatch(fetchAllAddresses(user?.id));
    });
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="flex justify-between min-h-screen gap-5 px-5">
      <div className="p-5 w-full mx-auto md:border-r-gray-400">
        <div className="flex justify-between">
          <h2 className="text-xl font-semibold text-start mb-6 text-black">
            Shipping Address:
          </h2>
          <div
            className="relative rounded-lg px-3 flex items-center justify-between "
            ref={chooseAddRef}
          >
            <button
              className="flex items-center  m-2 bg-gray-100 rounded-lg p-2  justify-between gap-2"
              onClick={toggleDropdown}
            >
              <ArrowUpDown className="h-4 w-4" />
              Choose Address
            </button>
            {isDropdownOpen && addressList && addressList.length > 0 && (
              <ul className="absolute top-14 left-0 border-2 rounded-lg bg-white w-full">
                {addressList.map((item) => (
                  <li
                    key={item._id}
                    className="py-2 text-center hover:bg-gray-100 cursor-pointer"
                  >
                    <div className="flex justify-between p-1">
                      <span
                        onClick={() => handleEditAddress(item)}
                        className="w-2/3"
                      >
                        {item.address}
                      </span>
                      <button
                        className="hover:bg-gray-200"
                        onClick={() => handleDeleteAddress(item._id)}
                      >
                        <X />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form className="max-w-[500px]" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="address" className="block text-gray-700">
              Address:
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              className="mt-1 p-2 border border-gray-300 rounded w-full"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="city" className="block text-gray-700">
              City:
            </label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
              className="mt-1 p-2 border border-gray-300 rounded w-full"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="pincode" className="block text-gray-700">
              Pincode:
            </label>
            <input
              type="text"
              id="pincode"
              name="pincode"
              value={formData.pincode}
              onChange={handleChange}
              required
              className="mt-1 p-2 border border-gray-300 rounded w-full"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="notes" className="block text-gray-700">
              Notes:
            </label>
            <textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded w-full"
            />
          </div>
          <h2 className="text-xl font-semibold text-start mb-6 text-black">
            Additional Contact Info:
          </h2>
          <div className="mb-4">
            <label htmlFor="phone" className="block text-gray-700">
              Phone:
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="mt-1 p-2 border border-gray-300 rounded w-full"
            />
          </div>
          <button
            type="submit"
            className={`w-full text-white py-2 rounded transition duration-200 cursor-pointer ${
              isFormValid() ? "bg-black hover:bg-gray-800" : "bg-gray-300"
            }`}
            disabled={!isFormValid()}
          >
            Save Adresss
          </button>
        </form>
      </div>
    </div>
  );
};

export default Address;
