const express = require('express')
const User = require('../../model/userModel')
const bcrypt = require('bcrypt')
const validateRegisterData = require('../../validation/register')
const isEmpty = require('../../validation/isEmpty')
const validateLoginData = require('../../validation/login')
const validateUpdateData = require('../../validation/update')

const router = express.Router()

//@route GET api/users/
//@desc Get all users
//@access Public
router.get('/', async (req, res) => {
    await User.find()
        .then((users) => {
            res.send(users)
        })
        .catch((err) => {
            res.json({ error: err })
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
    if (!isValid) res.status(400).json(errors);
    else {
        User.findOne({ email: email })
            .then(user => {
                return res.send({ autheticate: checkPassword(password, user.password) })
            })
            .catch(error => res.send({ error: 'User cannot found' }))
    }
})
//@route DELETE api/users/delete/:id
//@desc Remove a user
//@access Public
router.delete('/delete/:id', (req, res) => {
    User.findByIdAndDelete({ _id: req.params.id })
        .then(user => res.send(user))
        .catch(error => res.send(error))
})
//@route PUT api/users/update/:id
//@desc Remove a user
//@access Public
router.put('/update/:id', (req, res) => {
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
})
module.exports = router