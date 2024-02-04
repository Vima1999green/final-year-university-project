import React, { useState } from "react";
import Sign_css from './SignUpform.module.css'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'




// Hook for email and University ID validation
const useEmailValidation = () => {
    // State variables for email validation
    const [emailError, setEmailError] = useState("");

    // State variables for University ID validation
    const [universityIdError, setUniversityIdError] = useState("");

    // Function to validate email format
    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            setEmailError("Invalid email address");
        } else {
            setEmailError("");
        }
    };

    // Function to validate University ID format
    const validateUniversityId = (universityId) => {
        const universityIdRegex =
            /^[Ss][Cc]|[Mm][Ff]|[Mm][Dd]|[Ee][Gg]\/\d{4}\/\d{5}$/;

        if (!universityIdRegex.test(universityId)) {
            setUniversityIdError("Invalid University ID format");
            return false; // University ID is invalid
        } else {
            setUniversityIdError("");
            return true; // University ID is valid
        }
    };

    // Function to reset email error
    const resetEmailError = () => {
        setEmailError("");
    };

    // Function to reset University ID error
    const resetUniversityIdError = () => {
        setUniversityIdError("");
    };

    // Return validation functions and error messages
    return {
        validateEmail,
        emailError,
        resetEmailError,
        validateUniversityId,
        universityIdError,
        resetUniversityIdError,
    };
};

// Component for password validation
const PasswordValidator = ({ password, confirmPassword }) => {
    // Function to validate password
    const validatePassword = () => {
        let error = {};
        const minLength = 8;
        const password_pattern =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}[\]:;<>,.?~\\/-]).{8,}$/;

        if (!password) {
            return "Password cannot be empty";
        } else if (!password_pattern.test(password)) {
            error.password = "Password not valid";
        } else if (password !== confirmPassword) {
            return "Passwords do not match";
        } else if (password.length < minLength) {
            return `Password must be at least ${minLength} characters long`;
        } else {
            return "";
        }
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



    // Use email validation hook
    const {
        validateEmail,
        emailError,
        resetEmailError,
        validateUniversityId,
        universityIdError,
        resetUniversityIdError,
    } = useEmailValidation();

    // Event handlers for form fields
    const handleFnameChange = (event) => {
        setFname(event.target.value);
    };

    const handleLnameChange = (event) => {
        setLname(event.target.value);
    };

    const handleUidChange = (event) => {
        setUid(event.target.value);
    };

    const handleUemailChange = (event) => {
        setUemail(event.target.value);
    };

    const handleEmailChange = (event) => {
        const newEmail = event.target.value;
        setEmail(newEmail);
        validateEmail(newEmail);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleConfirmPasswordChange = (event) => {
        setConfirmPassword(event.target.value);
    };

    const handleUserTypeChange = (event) => {
        setUserType(event.target.value);
    };

    // Form submission
    const handleSubmit = async (event) => {

        event.preventDefault();
        setIsLoading(true)
        console.log('handle submit')
        if (!Fname || !Lname || !email || !password || !confirmpassword) {
            setRequiredFieldError("All fields are required");
            return false;
        }

        // Check University ID validity only if the user type is "university"
        if (userType === "university") {
            const isUniversityIdValid = validateUniversityId(Uid);

            if (!isUniversityIdValid) {
                return; // Do not proceed with form submission
            }
        }

        // Check if passwords match
        if (password !== confirmpassword) {
            setRequiredFieldError("Passwords do not match");
            return;
        }

        // Additional logic for form submission if needed

        // Log submitted data
        console.log('=====================================')
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
        console.log('=====================================')
        //axios request for register data
        await axios.post('http://localhost:4000/api/users/register', {
            firstName: Fname,
            lastName: Lname,
            email: email,
            userType: userType,
            password: password,
            universityID: Uid,
            universityEmail: Uemail
        })
            .then(res => {
                console.log(res.data)
                alert('regsitration succesfull')
                navigate(`/verifyEmail/${email}`)
            })
            .catch(err => {
                console.log(err.response.data)
                alert(err.response.data + '\r\n' + 'Registration failed')
            })
        // Clear form and errors
        // handleClear();
        setIsLoading(false)
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
        resetEmailError();
        resetUniversityIdError();
    };

    // JSX for the form
    return (
        <div className={Sign_css.content}>
            <div className={Sign_css.contentImage}>
                <div className={Sign_css.body_sign}>
                    <div className={Sign_css.register_form}>
                        <h2 className={Sign_css.signup_topic}>Sign Up</h2>
                        <form id="form01" className={Sign_css.signupform01} onSubmit={handleSubmit}>
                            {/* User Type */}
                            <label className={Sign_css.label_names}>User Type:</label>
                            <select
                                value={userType}
                                onChange={handleUserTypeChange}
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
                                onChange={handleFnameChange}
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
                                onChange={handleLnameChange}
                                required
                                className={Sign_css.inputFields}
                                name="LastName"
                                autoComplete="true"
                            />

                            {/* university fields */}
                            {userType === "university" && (
                                <>
                                    <div className="universitys">

                                        <label className={Sign_css.label_names}>University ID:</label>
                                        <input
                                            type="text"
                                            value={Uid}
                                            placeholder="University ID"
                                            onChange={handleUidChange}
                                            required
                                            className={Sign_css.inputFields}
                                            name="UniversityId"
                                            autoComplete="true"
                                        />
                                        {/* Display University ID error if exists */}
                                        {universityIdError && (
                                            <p style={{ color: "red", fontSize: "10px" }}>
                                                {universityIdError}
                                            </p>
                                        )}

                                        <label className={Sign_css.label_names}>University Email:</label>
                                        <input
                                            type="email"
                                            value={Uemail}
                                            placeholder="University Email"
                                            onChange={handleUemailChange}
                                            required
                                            className={Sign_css.inputFields}
                                            name="universityEmail"
                                            autoComplete='true'
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
                                onChange={handleEmailChange}
                                required
                                className={Sign_css.inputFields}
                                name="personalEmail"
                                autoComplete='true'

                            />
                            {/* Display email error if exists */}
                            {emailError && (
                                <p style={{ color: "red", fontSize: "10px" }}>{emailError}</p>
                            )}

                            {/* Password */}
                            <label className={Sign_css.label_names}>Password:</label>
                            <input
                                type="password"
                                value={password}
                                placeholder="Password"
                                onChange={handlePasswordChange}
                                required
                                className={Sign_css.inputFields}
                                name="password"
                                autoComplete='true'

                            />
                            {/* Password validation component */}
                            <PasswordValidator
                                password={password}
                                confirmPassword={confirmpassword}
                            />

                            {/* Confirm Password */}
                            <label className={Sign_css.label_names}>Confirm Password:</label>
                            <input
                                type="password"
                                value={confirmpassword}
                                placeholder="Confirm password"
                                onChange={handleConfirmPasswordChange}
                                required
                                className={Sign_css.inputFields}
                                name="confirmPassoword"
                            />
                            {/* Display required field error if exists */}
                            {requiredFieldError && (
                                <p style={{ color: "red", fontSize: "10px" }}>{requiredFieldError}</p>
                            )}

                            {/* Form submission buttons */}
                            <button className={Sign_css.submitBtn} type="submit" onClick={handleSubmit} disabled={isLoading}>
                                Submit
                            </button>
                            <button className={Sign_css.clearBtn} type="reset" onClick={handleClear} disabled={isLoading}>
                                Clear
                            </button>

                            <p className={Sign_css.already_account}>
                                Already have an Account?
                                <Link to="/login" className={Sign_css.login_link} onClick={switchForm}>
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