const express = require('express')
const User = require('../../model/userModel')
const bcrypt = require('bcrypt')
const validateRegisterData = require('../../validation/userRouteValidation/register')
const isEmpty = require('../../validation/isEmpty')
const validateLoginData = require('../../validation/userRouteValidation/login')
const validateUpdateData = require('../../validation/userRouteValidation/update')
const jwt = require('jsonwebtoken')
const secretOrKey = require('../../config/keys').secretOrKey
const passport = require('passport')

const router = express.Router()

//@route GET api/users/
//@desc Get all users
//@access Public
router.get('/', async (req, res) => {
    await User.find()
        .then((users) => {
            res.send(users)
        })
        .catch((error) => {
            res.status(400).send(error)
        })
})

//@route POST api/users/register
//@desc Regitser a user
//@access Public
router.post('/register', (req, res) => {
    //validate register data
    const { errors, isValid } = validateRegisterData(req.body);
    if (!isValid) res.status(400).json(errors);
    else {
        User.findOne({ email: req.body.email })
            .then(user => {
                if (isEmpty(user)) {
                    bcrypt.genSalt(10, (err, salt) => {
                        bcrypt.hash(req.body.password, salt, (err, hash) => {
                            User.create({
                                firstName: req.body.firstName,
                                lastName: req.body.lastName,
                                email: req.body.email,
                                password: hash,
                                userType: req.body.userType
                            }).then(user => res.send(user))
                                .catch(error => res.json(error))
                        })
                    })
                }
                else {
                    res.status(400).send({ msg: 'User already exists' })
                }

            })
            .catch(error => {
                res.send(error)
            })
    }

})
//password checking
const checkPassword = (raw, hash) => {
    return bcrypt.compareSync(raw, hash);
}
//@route POST api/users/login
//@desc Login a user
//@access Public
router.post('/login', (req, res) => {
    const { email, password } = req.body;
    const { errors, isValid } = validateLoginData(req.body);
    if (!isValid) res.status(401).json(errors);
    else {
        User.findOne({ email: email })
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
})
//@route DELETE api/users/delete/:id
//@desc Remove a user
//@access private
router.delete(
    '/delete/:id',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        if (req.user.id === req.params.id || req.user.userType === 'admin') {
            User.findByIdAndDelete({ _id: req.params.id })
                .then(user => res.send({ msg: 'sucess', user: user }))
                .catch(error => res.send(error))
        } else {
            return res.status(401).send({ msg: 'unsucess', error: 'You are not autherized to delete this account' })
        }
    })
//@route PUT api/users/update/:id
//@desc update a user
//@access Public
router.put(
    '/update/:id',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        if (req.user.id === req.params.id || req.user.userType === 'admin') {
            const { errors, isValid } = validateUpdateData(req.body);
            if (!isValid) res.status(400).send(errors)
            else {
                User.findOneAndUpdate({ _id: req.params.id }, req.body)
                    .then(user => {
                        User.findById({ _id: user.id })
                            .then(user => res.send(user))
                            .catch(error => res.send(error))
                    })
                    .catch(error => res.send(error))
            }
        }else {
            return res.status(401).send({ msg: 'unsucess', error: 'You are not autherized to update this account' })
        }
    })
//@route GET api/users/current
//@desc Return current user
//@access Private
router.get(
    '/current',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        
        res.send({
            id: req.user.id,
            email: req.user.email,
            userType: req.user.userType

        })
    })
module.exports = router