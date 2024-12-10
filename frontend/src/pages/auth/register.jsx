import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../../store/auth-slice";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "../../hooks/use-toast";
import { setToastAction } from "../../store/common/featuresSlice";

const AuthRegister = () => {
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [error, setError] = useState("");
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    if (!formData.userName || !formData.email || !formData.password) {
      setError("All fields are required!");
      return;
    } else {
      dispatch(registerUser(formData)).then((data) =>  {
        if (data?.payload?.success) {
          dispatch(setToastAction(data?.payload?.message));
          setTimeout(() => dispatch(setToastAction(null)), 3000);
          navigate("/auth/login");
        } else {
          dispatch(setToastAction(data?.payload?.message));
          setTimeout(() => dispatch(setToastAction(null)), 3000);
        }
      });
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white border-solid border-2 border-black p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center mb-6 text-black">
          Register
        </h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700">
              Username:
            </label>
            <input
              type="text"
              id="username"
              name="userName"
              value={formData.userName}
              onChange={handleChange}
              required
              className="mt-1 p-2 border border-gray-300 rounded w-full"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="mt-1 p-2 border border-gray-300 rounded w-full"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700">
              Password:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="mt-1 p-2 border border-gray-300 rounded w-full"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition duration-200"
          >
            Register
          </button>
        </form>
        <p className="mt-4 text-center text-gray-600">
          If you already have an account ,{" "}
          <Link to="/auth/login" className="text-blue-600 hover:underline">
            click here
          </Link>
          .
        </p>
      </div>
    </div>
  );
};

export default AuthRegister;
