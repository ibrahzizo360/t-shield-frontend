import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import PropTypes from "prop-types";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { FaRegEnvelope } from "react-icons/fa";
import { IoKeyOutline } from "react-icons/io5";
import { FiEyeOff } from "react-icons/fi";
import { useState } from "react";
import { FiEye } from "react-icons/fi";
import { FaRegUser } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

// Validation schema using Yup
const AuthForm = ({ isLogin, onSubmit, isLoading }) => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate(isLogin ? "/register" : "/login");
  };

  // Define the schema conditionally based on whether it's login or signup
  const schema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    username: !isLogin
      ? Yup.string()
          .min(3, "Username must be at least 3 characters")
          .required("Username is required")
      : Yup.string(),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    // For signup, we will also require a password confirmation
    ...(isLogin
      ? {}
      : {
          passwordConfirmation: Yup.string()
            .oneOf([Yup.ref("password"), null], "Passwords must match")
            .required("Password confirmation is required"),
        }),
  });

  return (
    <Formik
      initialValues={{
        email: "",
        username: !isLogin ? "" : undefined, // Include username only if not logging in
        password: "",
        ...(isLogin ? {} : { passwordConfirmation: "" }),
      }}
      validationSchema={schema}
      onSubmit={onSubmit}
    >
      {({ isSubmitting }) => (
        <Form className="w-[800px] lg:mt-24 lg:px-40">
          <h2 className="text-2xl font-bold mb-10 uppercase lg:mb-20 text-center text-[#3F7AFE]">
            {isLogin ? "Welcome Back 👋 " : "Join Us Today"}
          </h2>

          {/* Email Field */}
          <div className="mb-4">
            <label
              className="block mb-1 text-sm font-medium text-gray-700"
              htmlFor="email"
            >
              Email Address
            </label>
            <div className="relative">
              <Field
                type="email"
                id="email"
                name="email"
                placeholder="ziztech@gmail.com"
                className="w-full lg:w-[350px] px-3 py-1.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#16a5eb] pl-10"
              />
              <FaRegEnvelope className="absolute left-3 bottom-0.5 transform -translate-y-1/2 text-gray-500" />
            </div>
            <ErrorMessage
              name="email"
              component="p"
              className="text-red-500 text-sm mt-1"
            />
          </div>

          {/* Username Field (for signup only) */}
          {!isLogin && (
            <div className="mb-4">
              <label
                className="block mb-1 text-sm font-medium text-gray-700"
                htmlFor="username"
              >
                Username
              </label>
              <div className="relative">
                <Field
                  type="text"
                  id="username"
                  name="username"
                  placeholder="Choose a username"
                  className="w-full lg:w-[350px] px-3 py-1.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#16a5eb] pl-10"
                />
                <FaRegUser className="absolute left-3 bottom-0.5 transform -translate-y-1/2 text-gray-500" />
              </div>
              <ErrorMessage
                name="username"
                component="p"
                className="text-red-500 text-sm mt-1"
              />
            </div>
          )}

          {/* Password Field */}
          <div className="mb-6 relative">
            <label
              className="block mb-1 text-sm font-medium text-gray-700"
              htmlFor="password"
            >
              Password
            </label>
            <div className="relative">
              <Field
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                placeholder="Enter your password"
                className="w-full lg:w-[350px] px-3 py-1.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#16a5eb] pl-10"
              />
              <IoKeyOutline className="absolute left-3 bottom-0.5 transform -translate-y-1/2 text-gray-500" />

              {showPassword ? (
                <FiEyeOff
                  onClick={() => setShowPassword(false)}
                  className="absolute right-3 bottom-1 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                />
              ) : (
                <FiEye
                  onClick={() => setShowPassword(true)}
                  className="absolute right-3 bottom-1 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                />
              )}
            </div>
            <ErrorMessage
              name="password"
              component="p"
              className="text-red-500 text-sm mt-1"
            />
          </div>

          {/* Password Confirmation Field (for signup only) */}
          {!isLogin && (
            <div className="mb-6">
              <label
                className="block mb-1 text-sm font-medium text-gray-700"
                htmlFor="passwordConfirmation"
              >
                Confirm Password
              </label>
              <div className="relative">
                <Field
                  type="password"
                  id="passwordConfirmation"
                  name="passwordConfirmation"
                  placeholder="Confirm your password"
                  className="w-full lg:w-[350px] px-3 py-1.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#16a5eb] pl-10"
                />
                <IoKeyOutline className="absolute left-3 bottom-0.5 transform -translate-y-1/2 text-gray-500" />
                {showPassword ? (
                  <FiEyeOff
                    onClick={() => setShowPassword(false)}
                    className="absolute right-3 bottom-1 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                  />
                ) : (
                  <FiEye
                    onClick={() => setShowPassword(true)}
                    className="absolute right-3 bottom-1 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                  />
                )}
              </div>
              <ErrorMessage
                name="passwordConfirmation"
                component="p"
                className="text-red-500 text-sm mt-1"
              />
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting || isLoading}
            className="w-full py-2 px-4 bg-[#3F7AFE] text-white font-bold rounded-lg hover:bg-[#0f8dc3] transition-all disabled:opacity-50 flex items-center justify-center"
          >
            {isLoading ? (
              <DotLottieReact
                src="https://lottie.host/568de7a9-050b-4d29-b878-1656b8c10acc/QWL6wgntMV.lottie"
                loop
                autoplay
                style={{ height: "24px", width: "auto" }}
              />
            ) : isLogin ? (
              "Login"
            ) : (
              "Register"
            )}
          </button>

          <div className="flex items-center my-4">
            <hr className="flex-grow border-t border-gray-300" />
            <span className="mx-2 text-sm text-gray-500">OR</span>
            <hr className="flex-grow border-t border-gray-300" />
          </div>

          <div className="mt-4 text-center">
            <span className="text-gray-600 text-sm">
              {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
              <button
                onClick={handleNavigation}
                className="text-[#3F7AFE] font-bold hover:underline"
              >
                {isLogin ? "Sign up" : "Login"}
              </button>
            </span>
          </div>
        </Form>
      )}
    </Formik>
  );
};

AuthForm.propTypes = {
  isLogin: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default AuthForm;
