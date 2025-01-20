import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import PropTypes from "prop-types";

// Validation schema using Yup
const schema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .min(3, "Password must be at least 6 characters")
    .required("Password is required"),
});

const AuthForm = ({ isLogin, onSubmit }) => {
  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={schema}
      onSubmit={onSubmit}
    >
      {({ isSubmitting }) => (
        <Form className="mx-auto p-6 bg-white shadow-md rounded-lg w-1/3">
          <h2 className="text-2xl font-bold mb-4">
            {isLogin ? "Login" : "Register"}
          </h2>

          <div className="mb-4">
            <label className="block mb-1 text-sm font-medium" htmlFor="email">
              Email
            </label>
            <Field
              type="email"
              id="email"
              name="email"
              className="w-full p-2 border rounded"
            />
            <ErrorMessage
              name="email"
              component="p"
              className="text-red-500 text-sm"
            />
          </div>

          <div className="mb-4">
            <label
              className="block mb-1 text-sm font-medium"
              htmlFor="password"
            >
              Password
            </label>
            <Field
              type="password"
              id="password"
              name="password"
              className="w-full p-2 border rounded"
            />
            <ErrorMessage
              name="password"
              component="p"
              className="text-red-500 text-sm"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded"
          >
            {isLogin ? "Login" : "Register"}
          </button>
        </Form>
      )}
    </Formik>
  );
};

AuthForm.propTypes = {
  isLogin: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default AuthForm;
