
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Login_css from './Login.module.css'
import { Link } from "react-router-dom";
//import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import validation from "./Validation.js";
//import ForgotPWD from './FogotPWD';
import { useLogin } from '../hooks/useLogin.js'
import isEmpty from "../isEmpty.js";

function Login({ switchForm }) {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { login, error, isLoading } = useLogin()
  const handleInput = (e) => {
    setValues({ ...values, [e.target.name]: [e.target.value] });
  };

  function handleValidation(e) {
    e.preventDefault();
    setErrors(validation(values));
    if (isEmpty(errors)) {
      console.log("No erros")
      handleSubmit()
    } else {
      console.log(errors)
    }
  }
  const handleforgorpwd = () => {

  }

  const handleSubmit = async () => {
    await login(email, password)
  }
  return (

    <div className={Login_css.body_sign}>
      <div className={Login_css.login_container}>
        <div className={Login_css.login_form}>
          <div className="form">
            <form className="border p-3" >
              <div className={Login_css.header}>
                <h2>Login</h2>
              </div>
              <div className={Login_css.input_login}>
                <label>Email:</label>
                <input
                  type="email"
                  placeholder="Enter Email"
                  value={values.email}
                  name="email"
                  onChange={handleInput}
                  className="form-control"
                />

                {errors.email && (
                  <p style={{ color: "red", fontSize: "13px" }}>{errors.email}</p>
                )}
              </div>
              <div className={Login_css.input_login}>
                <label>Password:</label>
                <input
                  type="password"
                  placeholder="Enter Password"
                  value={values.password}
                  name="password"
                  onChange={handleInput}
                  className="form-control"
                />
                {errors.password && (
                  <p style={{ color: "red", fontSize: "13px" }}>
                    {errors.password}
                  </p>
                )}
              </div>
              <div className={Login_css.submit_login} >
                <button className="btn" type="submit" onClick={handleValidation} disabled={isLoading}>
                  Login
                </button>
                {error && <div className="error">{error}</div>}
              </div>
              <div className="remember me" style={{color:'black'}}>
                <input type="checkbox" title="remember_me" />
                Remember me
              </div>
              <br />


              <a href="/pwdReset" onClick={() => switchForm("pwdReset")}>
                Forgot Password
              </a>
              <p>
                Don't have an account ?




                <Link to="/Signup" className={Login_css.signup_link} onClick={switchForm}>
                  Click here to Create Account!</Link>
              </p>
            </form>
          </div>
        </div>

      </div>
    </div>


  );
}

export default Login;