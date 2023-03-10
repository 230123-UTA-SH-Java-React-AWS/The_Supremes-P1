import "./Login.css"
import { Component } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useState } from "react";

import AuthService from "../../services/AuthService";

const loginSchema = Yup.object().shape({
  username: Yup.string().required("This field is required!"),
  password: Yup.string().required("This field is required!"),
});

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = (formValue: { username: string; password: string }) => {
    const { username, password } = formValue;

    setLoading(true);
    setMessage("");

    AuthService.login(username, password).then(
      () => {
        navigate("/profile");
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setLoading(false);
        setMessage(resMessage);
      }
    );
  };
  return (
    <div className="">
      <div className="card_card-container">
        <h1 className="login-heading">Login</h1>
        <Formik
          initialValues={{
            //test values
            username: "testUser1",
            password: "test1",
          }}
          validationSchema={loginSchema}
          onSubmit={handleLogin}
        >
          <Form>
            <div className="form-group">
              <label className="register-label" htmlFor="username">Username</label>
              <Field name="username" type="text" className="form-control" />
              <ErrorMessage
                name="username"
                component="div"
                className="alert_alert-danger"
              />
            </div>

            <div className="form-group">
              <label className="register-label" htmlFor="password">Password</label>
              <Field name="password" type="password" className="form-control" />
              <ErrorMessage
                name="password"
                component="div"
                className="alert_lert-danger"
              />
            </div>

            <div className="form-group">
              <button
                type="submit"
                className="sign-up"
                style={{ backgroundColor: "var(--tertiary-clr)" }}
                disabled={loading}
              >
                {loading && <span className="spinner-border"></span>}
                <span>Login</span>
              </button>
            </div>

            {message && (
              <div className="form-group">
                <div className="alert_lert-danger" role="alert">
                  {message}
                </div>
              </div>
            )}
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default Login;
