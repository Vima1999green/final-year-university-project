const express = require('express')
const passport = require('passport')
const {
    getAllUsers,
    regiterUser,
    loginUser,
    deleteUser,
    updateUser,
    currentUser,
    verifyUser
} = require('../../controllers/userControllers')

const router = express.Router()

//@route GET api/users/
//@desc Get all users
//@access Public
router.get('/', getAllUsers)

//@route POST api/users/register
//@desc Regitser a user
//@access Public
router.post('/register', regiterUser)

//@route POST api/users/verify-email
//@desc verify user email
//@access Public
router.post('/verifyEmail', verifyUser)

//@route POST api/users/login
//@desc Login a user
//@access Public

router.post('/login', loginUser)

//@route DELETE api/users/delete/:id
//@desc Remove a user
//@access private
router.delete(
    '/delete/:id',
    passport.authenticate('jwt', { session: false }),
    deleteUser
)

//@route PUT api/users/update/:id
//@desc update a user
//@access Public
router.put(
    '/update/:id',
    passport.authenticate('jwt', { session: false }),
    updateUser
)

//@route GET api/users/current
//@desc Return current user
//@access Private
router.get(
    '/current',
    passport.authenticate('jwt', { session: false }),
    currentUser)
module.exports = router