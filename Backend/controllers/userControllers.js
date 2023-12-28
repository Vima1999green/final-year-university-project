const User = require('../model/userModel')
const sendEmail = require('./notificationController')
const bcrypt = require('bcrypt')
const validateRegisterData = require('../validation/userRouteValidation/register')
const isEmpty = require('../validation/isEmpty')
const validateLoginData = require('../validation/userRouteValidation/login')
const validateUpdateData = require('../validation/userRouteValidation/update')
const secretOrKey = require('../config/keys').secretOrKey
const jwt = require('jsonwebtoken')
const crypto=require('crypto')

//controller getAllUsers()
//description get all user account details in the database
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
const regiterUser = async (req, res) => {
    // Validate register data
    const { errors, isValid } = await validateRegisterData(req.body);
    if (!isValid) {
        res.status(400).json(errors);
    } else {
        try {
            const user = await User.findOne({ email: req.body.email });
            if (isEmpty(user)) {
                bcrypt.genSalt(10, async (err, salt) => {
                    try {
                        const hash = await bcrypt.hash(req.body.password, salt);
                        // Create confirmation code
                        const confirmationCode = crypto.randomBytes(16).toString('hex');
                        //create user
                        const newUser = await User.create({
                            firstName: req.body.firstName,
                            lastName: req.body.lastName,
                            email: req.body.email,
                            password: hash,
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
                                `<a href="https://localhost:4000/api/users/verifyEmail/${newUser.email}/${confirmationCode}">` + `
                                Click here to verify your email</a>`
                            )
                        } catch (error) {
                            console.error("Error sending email verification:", error);
                            return res.status(500).json({ error: "Error sending email verification:" });
                        }
                        res.send(newUser);
                    } catch (error) {
                        console.error("Error generating hash or creating user:", error);
                        return res.status(500).json({ error: "Error generating hash or creating user:" });
                    }
                });
            } else {
               return res.status(400).send({ msg: 'User already exists' });
            }
        } catch (error) {
            console.error("Error checking for existing user:", error);
            res.status(500).json({ error: "Error checking for existing user" });
        }
    }
};

//password checking
const checkPassword = (raw, hash) => {
    return bcrypt.compareSync(raw, hash);
}

//controller loginUser()
//description login user and send jwt token
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    const { errors, isValid } = await validateLoginData(req.body);
    if (!isValid) res.status(401).json(errors);
    else {
        await User.findOne({ email: email })
            .then(user => {
                const authMsg = checkPassword(password, user.password)
                if (!authMsg) return res.status(401).send({ isAutheticate: authMsg, msg: 'Incorrect password' })
                else {
                    //create payload
                    const payload = { id: user.id, email: user.email, firstName: user.firstName }
                    //sign jwt
                    jwt.sign(
                        payload,
                        secretOrKey,
                        { expiresIn: 3600 },
                        (error, token) => {
                            return res.send({
                                isAutheticate: authMsg,
                                token: 'Bearer ' + token
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
const deleteUser = async (req, res) => {
    if (req.user.id === req.params.id || req.user.userType === 'admin') {
        await User.findByIdAndDelete({ _id: req.params.id })
            .then(user => res.send({ msg: 'sucess', user: user }))
            .catch(error => res.status(500).send(error))
    } else {
        return res.status(401).send({ msg: 'unsucess', error: 'You are not autherized to delete this account' })
    }
}
//controller updateUser()
//description update user details in the database
const updateUser = async (req, res) => {
    if (req.user.id === req.params.id || req.user.userType === 'admin') {
        const { errors, isValid } = await validateUpdateData(req.body);
        if (!isValid) res.status(400).send(errors)
        else if (
            req.user.userType === 'guest' &&
            (!isEmpty(req.body.universityEmail) || !isEmpty(req.body.universityID))
        ) return res.status(400).send({ msg: 'unsucess', error: 'You are not a university type user' })
        else {
            try {
                const user = await User.findOneAndUpdate({ _id: req.params.id }, req.body)
                if (user) {
                    await User.findById({ _id: user.id })
                        .then(user => res.send(user))
                        .catch(error => res.status(500).send(error))
                }
            } catch (error) {
                console.error("Error updating or finding user:", error);
                res.status(500).json({ error: "Error updating or finding " });
            }
        }
    } else {
        return res.status(401).send({ msg: 'unsucess', error: 'You are not autherized to update this account' })
    }
}
//controller currentUser()
//description get information about the currently authenticated user 
const currentUser= (req, res) => {
    res.send({
        id: req.user.id,
        email: req.user.email,
        userType: req.user.userType

    })
}


module.exports={
    getAllUsers,
    regiterUser,
    loginUser,
    deleteUser,
    updateUser,
    currentUser
}