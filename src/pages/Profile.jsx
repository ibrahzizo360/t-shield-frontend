import { useState, useEffect } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import axios from "axios";
import Cookies from "js-cookie";
import { API_URL } from "../constants/urls";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch user info when the component mounts
  useEffect(() => {
    const fetchUserInfo = async () => {
      const token = Cookies.get("token");
      if (token) {
        try {
          const response = await axios.get(`${API_URL}/users/me`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setUser(response.data);
        } catch (error) {
          console.error("Error fetching user info:", error);
        }
      } else {
        console.log("No token found in cookies");
      }
      setIsLoading(false);
    };

    fetchUserInfo();
  }, []);

  if (isLoading) {
    return (
      <div className="w-full min-h-screen bg-gray-50 flex justify-center items-center py-10 px-5">
        <DotLottieReact
          src="https://lottie.host/568de7a9-050b-4d29-b878-1656b8c10acc/QWL6wgntMV.lottie"
          loop
          autoplay
          style={{ height: "100px", width: "auto" }}
        />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="w-full min-h-screen bg-gray-50 flex justify-center items-center py-10 px-5">
        <h2 className="text-xl font-semibold text-gray-700">User not found!</h2>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-gray-50 flex justify-center items-center py-10 px-5">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        {/* Profile Update Animation */}

        <h2 className="text-2xl font-bold text-center text-[#3F7AFE] mb-8">
          Profile Information
        </h2>

        <div className="mb-6">
          <DotLottieReact
            src="https://lottie.host/acad097e-054f-49a4-82c4-b9239b814fcd/7yH6rENTAD.lottie"
            loop
            autoplay
            style={{ height: "150px", width: "auto" }}
          />
        </div>

        {/* Displaying user info */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Username
          </label>
          <p className="text-gray-700">{user.username}</p>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email Address
          </label>
          <p className="text-gray-700">{user.email}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
