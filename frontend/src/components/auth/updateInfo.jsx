import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editUserInfo } from "../../store/auth-slice";
import { X } from "lucide-react";
import { setToastAction } from "../../store/common/featuresSlice";

const initialFormData = {
  currentPassword: "",
  newPassword: "",
};

const UpdateInfo = ({ user = {} }) => {
  const [formData, setFormData] = useState(initialFormData);
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const [edit, setEdit] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.newPassword && formData.currentPassword) {
      dispatch(editUserInfo({ id: user?.id, formData })).then((data) => {
        setFormData(initialFormData);
        dispatch(setToastAction(data?.payload?.message));
        setTimeout(() => dispatch(setToastAction(null)), 3000);
        setEdit(false);
      });
    } else {
      setError("All fields are required!");
    }
  };

  return (
    <div className="flex flex-col md:flex-row justify-between items-center p-6 gap-7">
      <div className="flex flex-col md:flex-row gap-4 md:gap-10 items-center">
        <div className="bg-black flex items-center justify-center w-24 h-24 md:h-32 md:w-32 text-white text-5xl md:text-7xl rounded-full cursor-pointer">
          {user?.userName ? user.userName[0].toUpperCase() : "?"}
        </div>
        <div className="flex flex-col gap-3 pt-3">
          <h2 className="font-bold text-3xl">{user?.userName || "Guest"}</h2>
          <h4 className="font-semibold text-xl">Email: {user?.email || "N/A"}</h4>
        </div>
      </div>
      <button
        onClick={() => setEdit(true)}
        className="p-3 bg-gray-200 rounded-lg font-semibold"
      >
        Change Password
      </button>
      {edit && (
        <div>
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          <form className="relative" onSubmit={handleSubmit}>
            <button
              className="absolute top-0 right-0"
              onClick={() => setEdit(false)}
            >
              <X />
            </button>
            <div className="mb-4">
              <label htmlFor="currentPassword" className="block text-gray-700">
                Current Password:
              </label>
              <input
                type="password"
                id="currentPassword"
                name="currentPassword"
                value={formData.currentPassword}
                onChange={handleChange}
                required
                className="mt-1 p-2 border border-gray-300 rounded w-full"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="newPassword" className="block text-gray-700">
                New Password:
              </label>
              <input
                type="password"
                id="newPassword"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                className="mt-1 p-2 border border-gray-300 rounded w-full"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition duration-200"
            >
              Save
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default UpdateInfo;
