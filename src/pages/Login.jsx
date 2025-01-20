import AuthForm from "../components/AuthForm";
import { API_URL } from "../constants/urls";
import axios from "axios";

const LoginPage = () => {
  const handleLogin = async (data) => {
    try {
      const response = await axios.post(`${API_URL}/users/login`, data);
      document.cookie = `token=${response.data.token}`;
      alert("Login successful!");
      window.location.href = "/profile";
    } catch (error) {
      console.error("Login error:", error.response.data);
      alert("Invalid credentials");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <AuthForm isLogin={true} onSubmit={handleLogin} />
    </div>
  );
};

export default LoginPage;
