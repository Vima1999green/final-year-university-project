const User = require('../model/userModel')
const Blacklist = require('../model/blacklistModel')
const sendEmail = require('./notificationController')
const bcrypt = require('bcrypt')
const validateRegisterData = require('../validation/userRouteValidation/register')
const isEmpty = require('../validation/isEmpty')
const validateLoginData = require('../validation/userRouteValidation/login')
const validateUpdateData = require('../validation/userRouteValidation/update')
const secretOrKey = require('../config/keys').secretOrKey
const jwt = require('jsonwebtoken')
const crypto = require('crypto')
const validator = require('validator')

//controller getAllUsers()
//description get all user account details in the database
//developer Lahiru Srimal
const getAllUsers = async (req, res) => {
    await User.find()
        .then((users) => {
            res.send(users)
        })
        .catch((error) => {
            res.status(400).send(error)
        })
}

//controller regiterUser()
//description register user details to database
//developer Lahiru Srimal
const regiterUser = async (req, res) => {
    // Validate register data
    const { errors, isValid } = await validateRegisterData(req.body);
    if (!isValid) {
        var errorMsg = ''
        Object.values(errors).forEach(error => {
            errorMsg += error + '\r\n'
        })
        errorMsg = errorMsg.trim()
        res.status(400).send(errorMsg);
    } else {
        try {
            const user = await User.findOne({ email: req.body.email });
            //check for isVerified
            if (isEmpty(user)) {
                bcrypt.genSalt(10, async (err, salt) => {
                    try {
                        const hash = await bcrypt.hash(req.body.password, salt);
                        // Create confirmation code
                        const randomNumber = crypto.randomBytes(3).readUIntBE(0, 3) % 1000000;
                        const confirmationCode = randomNumber.toString().padStart(6, '0');
                        //create user
                        const newUser = await User.create({
                            firstName: req.body.firstName,
                            lastName: req.body.lastName,
                            email: req.body.email,
                            password: hash,
                            isEmailVerified: false,
                            confirmationCode: confirmationCode,
                            userType: req.body.userType,
                            universityID: req.body.universityID,
                            universityEmail: req.body.universityEmail
                        });
                        // Sending email to user
                        try {
                            await sendEmail(
                                newUser.email,
                                "Email verification for Facility scheduler",
                                "Email verification for Facility scheduler",
                                `<p>Confirmation Code is ${confirmationCode}</p>`
                            )
                        } catch (error) {
                            console.error("Error sending email verification:", error);
                            return res.status(500).send('Error sending email verification');
                        }
                        res.send(newUser);
                    } catch (error) {
                        console.error("Error generating hash or creating user:", error);
                        return res.status(500).send('Error generating hash or creating user');
                    }
                });
            } else {
                return res.status(400).send('User already exists');
            }
        } catch (error) {
            console.error("Error checking for existing user:", error);
            res.status(500).send('Error checking for existing user');
        }
    }
};

//password checking
//developer Lahiru Srimal
const checkPassword = (raw, hash) => {
    return bcrypt.compareSync(raw, hash);
}

//controller verifyuser
//description verify user with confirmation code
//developer Malitha Chamikara
const verifyUser = async (req, res) => {
    const { email, confirmationCode } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).send("User not found")
        }
        if (confirmationCode !== user.confirmationCode) {
            return res.status(400).send("Invalid confirmation code");
        }
        try {
            await User.findOneAndUpdate({ _id: user.id }, { isEmailVerified: true })
        } catch (error) {
            return res.status(500).send("User not verified succesfully")
        }
        return res.send("User verified sucessfully")
    } catch (error) {

        console.error(error);
        return res.status(500).send("Error occured in  Verifying user");
    }

}

//controller loginUser()
//description login user and send jwt token
//developer Lahiru Srimal
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    const { errors, isValid } = await validateLoginData({ email, password });
    if (!isValid) {
        var errorMsg = ''
        Object.values(errors).forEach(error => {
            errorMsg += error + '\r\n'
        })
        errorMsg = errorMsg.trim()
        res.status(400).send({ isAutheticate: false, msg: errorMsg });
    }
    else {
        await User.findOne({ email: email })
            .then(user => {
                //redirect to verifyEmail if isEmailVeried is false
                if (!user.isEmailVerified)
                    return res.send({ isAutheticate: false, msg: 'Email is not verified' })
                const authMsg = checkPassword(password, user.password)
                if (!authMsg)
                    return res
                        .status(401)
                        .send({ isAutheticate: authMsg, msg: 'Incorrect password' })
                else {
                    //create payload
                    const payload = {
                        id: user.id,
                        email: user.email,
                        firstName: user.firstName,
                        userType: user.userType,
                        authenticate: user.isAutheticate
                    }
                    //sign jwt
                    jwt.sign(
                        payload,
                        secretOrKey,
                        { expiresIn: 3600 },
                        (error, token) => {
                            return res.send({
                                isAutheticate: authMsg,
                                token: 'Bearer ' + token,
                                userDetails: payload
                            })
                        }
                    )
                }
            })
            .catch(error => {
                res.status(404).send({ isAutheticate: false, msg: 'User cannot found' })
            })
    }
}
//controller deleteUser()
//description delete user from the database
//developer Malitha Chamikara
const deleteUser = async (req, res) => {
    if (req.user.id === req.params.id || req.user.userType === 'admin') {
        await User.findByIdAndDelete({ _id: req.params.id })
            .then(user => res.send('User deleted sucessfully'))
            .catch(error => res.status(500).send(error.message))
    } else {
        return res.status(401).send('You are not autherized to delete this account')
    }
}
//controller updateUser()
//description update user details in the database
//developer Lahiru Srimal
const updateUser = async (req, res) => {
    if (req.user.id === req.params.id || req.user.userType === 'admin') {
        const { errors, isValid } = validateUpdateData(req.body);
        if (!isValid) {
            var errorMsg = ''
            Object.values(errors).forEach(error => {
                errorMsg += error + '\r\n'
            })
            errorMsg = errorMsg.trim()
            res.status(400).send(errorMsg);
        }
        else if (
            !isEmpty(req.body.universityEmail) ||
            !isEmpty(req.body.universityID) ||
            !isEmpty(req.body.email) ||
            !isEmpty(req.body.password)

        ) return res.status(400).send('You can\'t update these data')
        else {
            try {
                const user = await User.findOneAndUpdate({ _id: req.params.id }, req.body)
                if (user) {
                    await User.findById({ _id: user.id })
                        .then(user => { return res.send(user) })
                        .catch(error => { res.status(500).send(error) })
                }
            } catch (error) {
                console.error("Error updating or finding user:", error);
                return res.status(500).send("Error updating or finding user");
            }
        }
    } else {
        return res.status(401).send('You are not autherized to update this account')
    }
}
//controller currentUser()
//description get information about the currently authenticated user 
//developer Lahiru Srimal
const currentUser = (req, res) => {
    res.send({
        id: req.user.id,
        email: req.user.email,
        userType: req.user.userType

    })
}

//controller reconfirmationEmail()
//description Recreate confirmation code and email it to user 
//developer Lahiru Srimal
const reconfirmationEmail = async (req, res) => {
    try {
        // Create confirmation code
        const randomNumber = crypto.randomBytes(3).readUIntBE(0, 3) % 1000000;
        const newConfirmationCode = randomNumber.toString().padStart(6, '0');
        const user = await User.findOneAndUpdate(
            { email: req.body.email },
            { confirmationCode: newConfirmationCode }
        )
        if (user) {
            const updatedUser = await User.findById(user._id)
            if (updatedUser) {
                // Sending email to user
                try {
                    sendEmail(
                        updatedUser.email,
                        "Email verification for Facility scheduler",
                        "Email verification for Facility scheduler",
                        `</p>Your confirmation code is ${newConfirmationCode}</p>`
                    )
                    return res.send("Email sent sucessfully")
                } catch (error) {
                    console.log(error)
                    return res.status(500).send('Error sending email verification');
                }
            }
        } else {
            return res.status(500).send("User does not exist")
        }
    } catch (error) {
        return res.status(500).send(error.message)
    }
};

//controller resetPwd()
//description Allow users to reset their password 
//developer Malitha Chamikara

const resetPwd = async (req, res) => {
    const { email, password, confirmationCode } = req.body
    if (
        !isEmpty(email) &&
        !isEmpty(password) &&
        !isEmpty(confirmationCode)
    ) {
        if (!validator.isLength(password, { min: 6, max: 12 }))
            return res.status(400).send("Password must be 6 and 12 characters")
        const user = await User.findOne({ email: email })
        if (user) {
            if (user.confirmationCode === confirmationCode) {
                bcrypt.genSalt(10, async (err, salt) => {
                    const hash = await bcrypt.hash(password, salt);
                    await User.findByIdAndUpdate({ _id: user.id }, { password: hash })
                        .then(updatedUser => {
                            if (!isEmpty(updatedUser)) return res.send("password updated")
                            else return res.status(500).send("Troble in updating password")
                        })
                        .catch(error => {
                            return res.status(500).send(error)
                        })
                })
            } else {
                return res.status(400).send("Invalid confirmation code")
            }

        } else {
            return res.status(404).send("User not found")
        }
    } else {
        return res.status(400).send("Incomplete Data")
    }

}

//controller logoutUser()
//description Logout user 
//developer lahiru Srimal
const logoutUser = async (req, res) => {

}
module.exports = {
    getAllUsers,
    regiterUser,
    loginUser,
    deleteUser,
    updateUser,
    currentUser,
    verifyUser,
    reconfirmationEmail,
    resetPwd,
    logoutUser
}