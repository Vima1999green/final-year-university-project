import React, { useState } from "react";
//import Login_css from './Login.module.css';
import "bootstrap/dist/css/bootstrap.min.css";
import Login_css from './Login.module.css'

function FogotPWD({ switchForm }) {

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  //const[message1,message2] = useState('')
  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();


    if (newPassword === confirmPassword) {

      setMessage('Password reset successfully !');
    } else {
      setMessage('Passwords do not match');
    }
  };

  return (

    <div className={Login_css.body_sign}>
      <div className={Login_css.login_container}>

        <div className={Login_css.login_form}>
          <div className="form">
            <form className="border p-3" onSubmit={handleSubmit}>

              <div className={Login_css.header}>
                <h2>Password Reset</h2>
              </div>

              <div className={Login_css.input_login}>
                <label> New Password:</label>
                <input
                  type="password"
                  id="newPassword"
                  name="newPassword"
                  value={newPassword}
                  onChange={handleNewPasswordChange}
                  required
                  placeholder="Enter new Password"
                  className="form-control"

                />
                {/* {message && (
            <p style={{ color: "red", fontSize: "13px" }}>
              {message}
            </p>
          )} */}
              </div>
              <div className={Login_css.input_login}>
                <label> Confirm Password:</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  required
                  placeholder="Re Enter new password"
                  className="form-control"
                />

              </div>

              <div className={Login_css.submit_login}>
                <button className="btn">Reset Password</button>
              </div>
              {message && (
                <p style={{ color: "red", fontSize: "13px" }}>
                  {message}
                </p>
              )}
            </form>
          </div>

        </div>

      </div>


    </div>


  )
}

export default FogotPWD