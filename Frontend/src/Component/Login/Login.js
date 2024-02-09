
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Login_css from './Login.module.css'
import { Link, useNavigate } from "react-router-dom";
//import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import validation from "./Validation.js";
//import ForgotPWD from './FogotPWD';
import isEmpty from "../../isEmpty.js";
import axios from 'axios';



function Login() {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleInput = (e) => {
    setValues({ ...values, [e.target.name]: [e.target.value] });
    if (e.target.type === 'email')

      setEmail(e.target.value)
    else if (e.target.type === 'password')
      setPassword(e.target.value)
  };

  function handleValidation(e) {
    e.preventDefault();
    setErrors(validation(values));
    if (isEmpty(errors)) {
      handleSubmit()
    } else {
      console.log(errors)
    }
  }
  const handleforgorpwd = async () => {
    console.log('hndle Forget pwd')
    if (isEmpty(email))
      alert('Email is empty')
    else {
      console.log('sending emaoil')
      await axios.post('http://localhost:4000/api/users/reconfirmationEmail', { email: email })
        .then(res => {
          console.log(res)
          alert(res.data)
          navigate(`/pwdReset/${email}`)
        })
        .catch(err => {
          console.log(err.response.data)
          alert(err.response.data)
        })
    }
  }

  const handleSubmit = async () => {

    setIsLoading(true)
    setError(null)
    await axios.post('http://localhost:4000/api/users/login', {
      email: email,
      password: password
    }
    )
      .then(res => {
        console.log(res.data)
        if (res.data.isAutheticate) {
          localStorage.setItem('facilityUser', JSON.stringify(res.data))
          alert('login succcesfulll');
          navigate('/landpage')
        }
        else {
          if (res.data.msg === 'Email is not verified') {
            axios.post('http://localhost:4000/api/users/reconfirmationEmail', { email: email })
              .then(res => {
                console.log(res.data)
              })
              .catch(err => {
                console.log(err.responce.data)
              })
            alert('Login Failed\r\n' + res.data.msg)
            navigate(`/verifyEmail/${email}`)
          }
          else {
            alert('Login Failed\r\n' + res.data.msg)
          }
        }
      })
      .catch(err => {
        console.log(err.response.data)
        //alert('error occured');
        alert('Login Failed\r\n' + err.response.data.msg)
      })
    setIsLoading(false)
  }


  return (
    <div className={Login_css.content}>
      <div className={Login_css.contentImage}>

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
                  {/* <div className="remember me" style={{ color: 'black' }}>
                    <input type="checkbox" title="remember_me" />
                    Remember me
                  </div> */}
                  <br />



                  <a onClick={handleforgorpwd} className="btn btn-outline-primary" >
                    Forgot Password
                  </a>
                  <p>
                    Don't have an account ?




                    <Link to="/signup" className={Login_css.signup_link}>
                      Click here to Create Account!</Link>
                  </p>
                </form>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>


  );
}

export default Login;