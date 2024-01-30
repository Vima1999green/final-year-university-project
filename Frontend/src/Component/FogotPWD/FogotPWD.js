import React, { useState } from "react";
//import Login_css from './Login.module.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from 'react-router-dom'
import Login_css from '../Login/Login.module.css'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom';
import isEmpty from "../../isEmpty";

function FogotPWD() {

  const { userEmail } = useParams();
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [confirmationCode, setconfirmationCode] = useState('');
  //const[message1,message2] = useState('')
  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };
  const handleConfirmationCode = (e) => {
    setconfirmationCode(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEmpty(confirmationCode)) {
      setMessage('Confirmation code required')
      alert('Confirmation code required')
    } else if (newPassword === confirmPassword) {
      await axios.post('http://localhost:4000/api/users/resetPwd',
        {
          email: userEmail,
          confirmationCode,
          password: newPassword
        })
        .then(res => {
          setMessage('Password reset successfully !');
          alert('Password reset successfully')
          navigate('/login')
        })
        .catch(err => {
          setMessage('Password update fail')
          alert('Password update fail')
        })
    } else {
      setMessage('Passwords do not match');
      alert('Passwords do not match')
    }
  };

  return (
    <div className={Login_css.content}>
      <div className={Login_css.contentImage}>
        <div className={Login_css.body_sign}>
          <div className={Login_css.login_container}>

            <div className={Login_css.login_form}>
              <div className="form">
                <form className="border p-3" onSubmit={handleSubmit}>

                  <div className={Login_css.header}>
                    <h2>Password Reset</h2>
                  </div>
                  <div className={Login_css.input_login}>
                    <label> Confirmation Code:</label>
                    <input
                      type="text"
                      id="confirmationCode"
                      name="confirmationCode"
                      value={confirmationCode}
                      onChange={handleConfirmationCode}
                      required
                      placeholder="Enter confirmation code"
                      className="form-control"
                    />

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
                  <Link to="/login" className={Login_css.login_link}>
                    Back to Login
                  </Link>


                </form>
              </div>

            </div>

          </div>


        </div>
      </div>
    </div>


  )
}

export default FogotPWD