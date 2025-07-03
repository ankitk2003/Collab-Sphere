import React, { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { authAtom } from "../store/atoms/loginState";
import { useRecoilValue, useSetRecoilState } from "recoil";

function Login() {
  const navigate = useNavigate();
  const setState = useSetRecoilState(authAtom);
  const stateValue = useRecoilValue(authAtom);

  useEffect(() => {
    console.log("Updated stateValue:", stateValue); // ✅ This will log correctly after the state updates
  }, [stateValue]);

  const emailRef = useRef();
  const passwordRef = useRef();

  const handleLogin = async (e) => {
    e.preventDefault();

    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    if (!email || !password) {
      alert("All fields are required");
      return;
    }

    try {
      const res = await axios.post("http://localhost:3000/api/v1/user/signin", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      const role = res.data.role;
      localStorage.setItem("role",role);
      // console.log(role);
      alert("Login successful!");

      setState(true); //  Set Recoil state after successful login

      if (role === "creator") {
        const profileData = await axios.get(
          "http://localhost:3000/api/v1/creator/profile",
          {
            headers: { Authorization: `Bearer ${res.data.token}` },
          }
        );

        if (profileData.data.message) {
          navigate("/creator-form");
        } else {
          navigate("/creator-dashboard");
        }
      } else {
        const profileData = await axios.get(
          "http://localhost:3000/api/v1/business/profile",
          {
            headers: { Authorization: `Bearer ${res.data.token}` },
          }
        );

        if (profileData.data.message) {
          navigate("/business-form");
        } else {
          navigate("/business-dashboard");
        }
      }
    } catch (error) {
      if (error.response && error.response.status === 403) {
        alert("Incorrect credentials");
      } else {
        alert("Something went wrong. Please try again later.");
      }
    }
  };

  return (
    <>
      <div className="text-center mt-8 mb-4 text-xl font-semibold text-gray-700">
        Good to see you again! Let’s pick up where you left off.
      </div>
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-xl">
          <h2 className="text-2xl font-bold text-center text-gray-800">Login</h2>
          <form className="space-y-4">
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                placeholder="e.g., example@email.com"
                className="w-full px-4 py-2 text-gray-700 bg-gray-100 border rounded-lg focus:ring focus:ring-blue-300 focus:outline-none"
                ref={emailRef}
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                className="w-full px-4 py-2 text-gray-700 bg-gray-100 border rounded-lg focus:ring focus:ring-blue-300 focus:outline-none"
                ref={passwordRef}
              />
            </div>
            <div>
              <button
                type="submit"
                className="w-full px-4 py-2 text-white bg-green-500 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300"
                onClick={handleLogin}
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
