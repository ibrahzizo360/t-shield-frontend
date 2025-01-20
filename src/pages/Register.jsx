import AuthForm from "../components/AuthForm";
import { API_URL } from "../constants/urls";
import axios from "axios";

const RegisterPage = () => {
  const handleRegister = async (data) => {
    try {
      await axios.post(`${API_URL}/users/register`, data);
      alert("Registration successful!");
      window.location.href = "/login";
    } catch (error) {
      console.error("Registration error:", error.response.data);
      alert("Registration failed");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <AuthForm isLogin={false} onSubmit={handleRegister} />
    </div>
  );
};

export default RegisterPage;
