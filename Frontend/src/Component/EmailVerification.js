import React from 'react'
import Login_css from './Login.module.css'
import email from '../Images/email2.png';

function EmailVerification() {
  return (
    <div>EmailVerification
        <div className={Login_css.body_sign}>
            <div className={Login_css.login_container}>
                <div className={Login_css.login_form}>
            <div className="form">
                <form className='border p-3'>
                <div className={Login_css.header}>
                <h2> Email Verification </h2>
                <img src={email} alt ='email_verify_img' style={{width:'100px'}}></img>

              </div>
              <div className={Login_css.input_login}>
                <label>Please enter the 6 digit code sent to your email address.</label>
                <input
                  type="text"
                  placeholder="Enter verification code"
                  name="email"
                  className="form-control"
                />
                </div>
                <div className={Login_css.submit_login} >
                <button className="btn" type="submit" >
                  Verify Your Email
                </button>
               
              </div>
              <p>
                <br/>
              <a href='#' alt='' class="btn btn-outline-primary" >Resend Email</a>
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