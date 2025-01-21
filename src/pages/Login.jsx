// LoginPage.js
import AuthForm from "../components/AuthForm";
import { API_URL } from "../constants/urls";
import axios from "axios";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (data) => {
    setIsLoading(true);
    try {
      const response = await axios.post(`${API_URL}/users/login`, data);
      document.cookie = `token=${response.data.token}`;
      alert("Login successful!");
      navigate("/profile");
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
      alert("Invalid credentials");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen">
      {/* Left Section */}
      <div className="w-full md:w-[40%] p-6 bg-gray-50 flex items-center justify-center shadow-lg">
        <AuthForm isLogin={true} onSubmit={handleLogin} isLoading={isLoading} />
      </div>

      {/* Right Section */}
      <div className="hidden md:flex relative w-[60%] bg-white flex-col items-center justify-center">
        <h1 className="text-3xl font-bold mt-4 text-gray-800">
          Welcome to ZizTech
        </h1>
        <p className="mt-4 text-lg text-gray-600 text-center">
          Empowering your digital journey with intuitive technology.
        </p>

        <div className="w-3/4 mt-4">
          <DotLottieReact
            src="https://lottie.host/ecbc9d2e-e17f-4972-9606-4191e342c779/aImuB4JV6t.lottie"
            loop
            autoplay
            height={230}
            style={{ width: "100%", height: "auto" }}
          />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
