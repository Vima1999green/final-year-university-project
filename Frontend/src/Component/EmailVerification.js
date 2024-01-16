import React, { useState } from 'react'
import Login_css from './Login.module.css'
import email from '../Images/email2.png';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Form from './Form';


function EmailVerification() {
  const navigate = useNavigate();

  const [confirmationCode, setconfirmationCode] = useState('')



  const hanldeConfCode = (e) => {
    setconfirmationCode(e.target.value);
  }

  const handleSubmit = async () => {

    const userEmail = "malithachamikara5@gmail.com"



    await axios.post('http://localhost:4000/api/users/verifyEmail/${userEmail}', {
      confirmationCode: confirmationCode,


    })
  }
  return (
    <div>EmailVerification
      <div className={Login_css.body_sign}>
        <div className={Login_css.login_container}>
          <div className={Login_css.login_form}>
            <div className="form">
              <form className='border p-3'>
                <div className={Login_css.header}>
                  <h2> Email Verification </h2>
                  <img src={email} alt='email_verify_img' style={{ width: '100px' }}></img>

                </div>
                <div className={Login_css.input_login}>
                  <label>Please enter the 6 digit code sent to your email address.</label>
                  <input
                    type="text"
                    placeholder="Enter verification code"
                    name="email"
                    className="form-control"
                    value={confirmationCode}
                    onChange={hanldeConfCode}
                  />
                </div>
                <div className={Login_css.submit_login} >
                  <button className="btn" type="submit" onClick={handleSubmit} >
                    Verify Your Email
                  </button>

                </div>
                <p>
                  <br />
                  <a href='#' alt='' className="btn btn-outline-primary" >Resend Email</a>
                </p>


              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EmailVerification