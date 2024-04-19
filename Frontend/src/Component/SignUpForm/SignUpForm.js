import React, { useState } from "react";
import Sign_css from "./SignUpform.module.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Component for password validation
const PasswordValidator = ({ password, confirmPassword }) => {
  // Function to validate password
  const validatePassword = () => {
    if (!password) {
      return "Password cannot be empty";
    }

    if (!confirmPassword) {
      return ""; // No need to show "Passwords do not match" error until confirmation password is entered
    }

    const minLength = 8;
    const passwordPattern =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}[\]:;<>,.?~\\/-]).{8,}$/;

    if (!passwordPattern.test(password)) {
      return "Password not valid";
    }

    if (password !== confirmPassword) {
      return "Passwords do not match";
    }

    if (password.length < minLength) {
      return `Password must be at least ${minLength} characters long`;
    }

    return "";
  };

  // Get password error message
  const passwordError = validatePassword();

  // Display password error if it exists
  return (
    <>
      {passwordError && (
        <p style={{ color: "red", fontSize: "10px" }}>{passwordError}</p>
      )}
    </>
  );
};

// Main form component
const Form = ({ switchForm }) => {
  // State variables for form fields and errors
  const [userType, setUserType] = useState("Guest");
  const [Fname, setFname] = useState("");
  const [Lname, setLname] = useState("");
  const [Uid, setUid] = useState("");
  const [Uemail, setUemail] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [requiredFieldError, setRequiredFieldError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    if (!Fname || !Lname || !email || !password || !confirmpassword) {
      setRequiredFieldError("All fields are required");
      setIsLoading(false);
      return;
    }

    // Check if passwords match
    if (password !== confirmpassword) {
      setRequiredFieldError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    // Additional logic for form submission if needed

    // Log submitted data
    console.log("=====================================");
    console.log("Submitted data:", {
      UserType: userType,
      FirstName: Fname,
      lastName: Lname,
      UniversityId: userType === "university" ? Uid : undefined,
      UniversityEmail: userType === "university" ? Uemail : undefined,
      PersonalEmail: email,
      Password: password,
      confPassword: confirmpassword,
    });
    console.log("=====================================");
    //axios request for register data
    await axios
      .post("http://localhost:4000/api/users/register", {
        firstName: Fname,
        lastName: Lname,
        email: email,
        userType: userType,
        password: password,
        universityID: Uid,
        universityEmail: Uemail,
      })
      .then((res) => {
        console.log(res.data);
        alert("registration successful");
        navigate(`/verifyEmail/${email}`);
      })
      .catch((err) => {
        console.log(err.response.data);
        alert(err.response.data + "\r\n" + "Registration failed");
      });

    // Clear form and errors
    // handleClear();
    setIsLoading(false);
  };

  // Clear form and errors
  const handleClear = () => {
    setFname("");
    setLname("");
    setUid("");
    setUemail("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setRequiredFieldError("");
  };

  // JSX for the form
  return (
    <div className={Sign_css.content}>
      <div className={Sign_css.contentImage}>
        <div className={Sign_css.body_sign}>
          <div className={Sign_css.register_form}>
            <h2 className={Sign_css.signup_topic}>Sign Up</h2>
            <form
              id="form01"
              className={Sign_css.signupform01}
              onSubmit={handleSubmit}
            >
              {/* User Type */}
              <label className={Sign_css.label_names}>User Type:</label>
              <select
                value={userType}
                onChange={(e) => setUserType(e.target.value)}
                className={Sign_css.U_type_selector}
                name="userType"
              >
                <option value="Guest">Guest</option>
                <option value="university">University</option>
              </select>

              {/* First Name */}
              <label className={Sign_css.label_names}>First Name:</label>
              <input
                type="text"
                value={Fname}
                placeholder="First Name"
                onChange={(e) => setFname(e.target.value)}
                required
                className={Sign_css.inputFields}
                name="firstName"
                autoComplete="true"
              />

              {/* Last Name */}
              <label className={Sign_css.label_names}>Last Name:</label>
              <input
                type="text"
                value={Lname}
                placeholder="Last Name"
                onChange={(e) => setLname(e.target.value)}
                required
                className={Sign_css.inputFields}
                name="LastName"
                autoComplete="true"
              />

              {/* University fields */}
              {userType === "university" && (
                <>
                  <div className="universitys">
                    <label className={Sign_css.label_names}>
                      University ID:
                    </label>
                    <input
                      type="text"
                      value={Uid}
                      placeholder="University ID"
                      onChange={(e) => setUid(e.target.value)}
                      required
                      className={Sign_css.inputFields}
                      name="UniversityId"
                      autoComplete="true"
                    />

                    <label className={Sign_css.label_names}>
                      University Email:
                    </label>
                    <input
                      type="email"
                      value={Uemail}
                      placeholder="University Email"
                      onChange={(e) => setUemail(e.target.value)}
                      required
                      className={Sign_css.inputFields}
                      name="universityEmail"
                      autoComplete="true"
                    />
                  </div>
                </>
              )}

              {/* Personal Email */}
              <label className={Sign_css.label_names}>Personal Email:</label>
              <input
                type="email"
                value={email}
                placeholder="Email..."
                onChange={(e) => setEmail(e.target.value)}
                required
                className={Sign_css.inputFields}
                name="personalEmail"
                autoComplete="true"
              />

              {/* Password */}
              <label className={Sign_css.label_names}>Password:</label>
              <input
                type="password"
                value={password}
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                required
                className={Sign_css.inputFields}
                name="password"
                autoComplete="true"
              />

              {/* Confirm Password */}
              <label className={Sign_css.label_names}>Confirm Password:</label>
              <input
                type="password"
                value={confirmpassword}
                placeholder="Confirm password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className={Sign_css.inputFields}
                name="confirmPassoword"
              />

              {/* Password validation component */}
              <PasswordValidator
                password={password}
                confirmPassword={confirmpassword}
              />

              {/* Display required field error if exists */}
              {requiredFieldError && (
                <p style={{ color: "red", fontSize: "10px" }}>
                  {requiredFieldError}
                </p>
              )}

              {/* Form submission buttons */}
              <button
                className={Sign_css.submitBtn}
                type="submit"
                disabled={isLoading}
              >
                Submit
              </button>
              <button
                className={Sign_css.clearBtn}
                type="button"
                onClick={handleClear}
                disabled={isLoading}
              >
                Clear
              </button>

              <p className={Sign_css.already_account}>
                Already have an Account?
                <Link
                  to="/login"
                  className={Sign_css.login_link}
                  onClick={switchForm}
                >
                  Click here to Login
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;
