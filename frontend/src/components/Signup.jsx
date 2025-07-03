import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [stage, setStage] = useState(1);
  const [loading, setLoading] = useState(false);
  const role = localStorage.getItem("role");
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
    username: "",
    role: role,
    otp: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = async () => {
    console.log("Signup details:", form);

    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:3000/api/v1/user/signup",
        {
          username: form.username,
          email: form.email,
          password: form.password,
          role: form.role,
        }
      );
      // console.log(response.data);
      setStage(2); // move to OTP stage after signup success
      setLoading(false);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        alert("User already exists");
      } else {
        alert("Signup failed");
      }
      console.error("Sign-up failed:", error.response?.data || error.message);
    }
  };

  const handleOtpVerification = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/user/verify-otp",
        {
          email: form.email,
          otp: form.otp,
        }
      );

      console.log("OTP verification successful:", response.data);

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("username", response.data.userName);
      localStorage.setItem("role", response.data.role);

      alert("Email verified and signed up successfully!");

      if (form.role === "creator") {
        navigate("/creator-form");
      } else {
        navigate("/business-form");
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        alert(error.response.data.message || "Invalid OTP");
      } else {
        alert("OTP verification failed");
      }
      console.error(
        "OTP verification error:",
        error.response?.data || error.message
      );
    }
  };

  return (

    // as after signup it takes 1-2 sec to change stage and load the otp componet and get the response of otp se , we added a loader 
    <>
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-5 rounded-md shadow-lg">
            <p className="text-xl font-semibold">Loading...</p>
          </div>
        </div>
      )}

      {stage === 1 ? (
        <>
          {/* Signup Stage */}
          <div id="logo">
            <span className="font-bold ml-5 text-xl">Collab_sphere</span>
          </div>

          <div className="flex justify-center mt-5">
            <h1 className="font-serif text-3xl">
              Find best creator for your business
            </h1>
          </div>

          <div className="mt-6 border-[1px] border-black h-[600px] w-screen border-opacity-30 shadow-md">
            {/* OAuth Buttons */}
            <div className="flex justify-center mt-10">
              <button className="border-[2px] rounded-3xl h-[30px] w-[200px]">
                Continue with Apple ID
              </button>
              <span className="ml-5">or</span>
              <button className="border-[2px] ml-5 rounded-3xl h-[30px] w-[200px] bg-blue-400 text-white">
                Continue with Google
              </button>
            </div>

            {/* Username Field */}
            <div className="flex flex-col items-start mt-4 mx-auto w-[450px]">
              <label htmlFor="username" className="text-lg mb-2">
                Username:
              </label>
              <input
                type="text"
                id="username"
                placeholder="Enter your name"
                className="border-[1px] border-black border-opacity-40 rounded-lg p-1 w-[450px]"
                required
                value={form.username}
                name="username"
                onChange={handleChange}
              />
            </div>

            {/* Email */}
            <div className="flex flex-col items-start mt-4 mx-auto w-[450px]">
              <label htmlFor="email" className="text-lg mb-2">
                Email:
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter your Email"
                className="border-[1px] border-black border-opacity-40 rounded-lg p-1 w-[450px]"
                required
                value={form.email}
                name="email"
                onChange={handleChange}
              />
            </div>

            {/* Password */}
            <div className="flex flex-col items-start mt-4 mx-auto w-[450px]">
              <label htmlFor="password" className="text-lg mb-2">
                Password:
              </label>
              <input
                type="password"
                id="password"
                placeholder="Enter your Password"
                className="border-[1px] border-black border-opacity-40 rounded-lg p-1 w-[450px]"
                required
                value={form.password}
                name="password"
                onChange={handleChange}
              />
            </div>

            {/* Checkbox */}
            <div className="flex items-start mt-4 mx-auto w-[450px]">
              <input type="checkbox" />
              <span className="ml-5">
                Yes, I agree to the terms and conditions
              </span>
            </div>

            {/* Sign Up Button */}
            <div className="flex justify-center mt-8 mx-auto w-[450px]">
              <button
                onClick={handleSignup}
                className="border-[1px] border-black w-[200px] h-[35px] rounded-md bg-green-500 text-white"
              >
                {form.role == "creator"
                  ? "sign up as creator"
                  : "Sign Up as business"}
              </button>
            </div>
          </div>
        </>
      ) : (
        <>
          <div id="logo">
            <span className="font-bold ml-5 text-xl">Collab_sphere</span>
          </div>

          <div className="flex justify-center mt-5">
            <h1 className="font-serif text-3xl">Verify Your Email</h1>
          </div>

          <div className="mt-6 border-[1px] border-black h-[300px] w-screen border-opacity-30 shadow-md">
            {/* OTP Input */}
            <form onSubmit={handleOtpVerification}>
              <div className="flex flex-col items-start mt-12 mx-auto w-[450px]">
                <label htmlFor="otp" className="text-lg mb-2">
                  Enter OTP:
                </label>
                <input
                  type="text"
                  id="otp"
                  placeholder="Enter the 6-digit OTP"
                  className="border-[1px] border-black border-opacity-40 rounded-lg p-1 w-[450px]"
                  onChange={handleChange}
                  required
                  name="otp"
                  value={form.otp}
                />
              </div>

              {/* Verify OTP Button */}
              <div className="flex justify-center mt-8 mx-auto w-[450px]">
                <button
                  type="submit"
                  className="border-[1px] border-black w-[200px] h-[35px] rounded-md bg-green-500 text-white"
                >
                  Verify OTP
                </button>
              </div>
            </form>
          </div>
        </>
      )}
    </>
  );
}
