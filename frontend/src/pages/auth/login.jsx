import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../store/auth-slice";
import { setToastAction } from "../../store/common/featuresSlice";

const AuthLogin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  

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
    if (!formData.email || !formData.password) {
      setError("All fields are required!");
      return;
    }
    dispatch(loginUser(formData)).then((data) => {
      console.log(data?.payload?.message);
      
      dispatch(setToastAction(data?.payload?.message));
      setTimeout(() => dispatch(setToastAction(null)), 3000);
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div className="bg-white border-solid border-2 border-black p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center mb-6 text-black">
          Login
        </h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
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
            Login
          </button>
        </form>
        <p className="mt-4 text-center text-gray-600">
          If you haven't registered yet,{" "}
          <Link to="/auth/register" className="text-blue-600 hover:underline">
            click here
          </Link>
          .
        </p>
      </div>
    </div>
  );
};

export default AuthLogin;
