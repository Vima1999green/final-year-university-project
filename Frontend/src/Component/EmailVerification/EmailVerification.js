import React, { useState } from 'react'
import Login_css from './EmailVerification.module.css'
import email from '../../Images/email2.png';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Form from '../SignUpForm/SignUpForm';


function EmailVerification() {
  const { userEmail } = useParams();
  const navigate = useNavigate();

  const [confirmationCode, setconfirmationCode] = useState('')

  const resendEmail = () => {
    axios.post(
      'http://localhost:4000/api/users/reconfirmationEmail',
      { email: userEmail })
      .then(res => {
        console.log(res.data)
        alert(res.data)
      })
      .catch(err => {
        console.log(err.response.data)
        alert(err.response.data)
      })
  }

  const hanldeConfCode = (e) => {
    console.log('handleConfCode')
    setconfirmationCode(e.target.value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    //const userEmail = "malithachamikara5@gmail.com"
    await axios.post(`http://localhost:4000/api/users/verifyEmail`, {
      email: userEmail,
      confirmationCode: confirmationCode
    }).then(res => {
      console.log(res)
      alert('Email verified')
      console.log('navigating to login')
      navigate('/login')
    })
      .catch(err => {
        console.log(err.response.data)
        alert(err.response.data)
      })
  }
  return (
    <div className={Login_css.content}>
      <div className={Login_css.contentImage}>
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
                    <button className="btn" type="submit" onClick={e => handleSubmit(e)} >
                      Verify Your Email
                    </button>

                  </div>
                  <p>
                    <br />
                    <a onClick={resendEmail} className="btn btn-outline-primary" >Resend Email</a>
                  </p>


                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EmailVerification