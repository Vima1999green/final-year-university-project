const express = require("express");
const passport = require("passport");
const {
  getAllUsers,
  regiterUser,
  loginUser,
  deleteUser,
  updateUser,
  currentUser,
  verifyUser,
  reconfirmationEmail,
  resetPwd,
  logoutUser,
  getUserById,
} = require("../../controllers/userControllers");

const router = express.Router();

//@route GET api/users/
//@desc Get all users
//@access Public
//@developer Lahiru Srimal
router.get("/", getAllUsers);

//@route POST api/users/register
//@desc Regitser a user
//@access Public
//@developer Lahiru Srimal
router.post("/register", regiterUser);

//@route POST api/users/verify-email
//@desc verify user email
//@access Public
//@developer Malitha Chamikara
router.post("/verifyEmail", verifyUser);

//@route POST api/users/login
//@desc Login a user
//@access Public
//@developer Lahiru Srimal

router.post("/login", loginUser);

//@route DELETE api/users/delete/:id
//@desc Remove a user
//@access private
//@developer Malitha Chamikara
router.delete(
  "/delete/:id",
  passport.authenticate("jwt", { session: false }),
  deleteUser
);

//@route PUT api/users/update/:id
//@desc update a user
//@access Public
//@developer Lahiru Srimal
router.put(
  "/update/:id",
  passport.authenticate("jwt", { session: false }),
  updateUser
);

//@route GET api/users/current
//@desc Return current user
//@access Private
//@developer Lahiru Srimal
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  currentUser
);

//@route post api/users/reConfirmationEmail
//@desc Recreate confirmation code and email it to user
//@access public
//@developer Lahiru Srimal
router.post("/reConfirmationEmail", reconfirmationEmail);

//@route post api/users/resetPwd
//@desc Reset password
//@access public
//@developer Malitha Chamikara
router.post("/resetPwd", resetPwd);
//@route post api/users/logout
//@desc logout user
//@access private
//@developer Lahiru Srimal
router.post(
  "/logout:token",
  passport.authenticate("jwt", { session: false }),
  logoutUser
);

router.get("/getUserById/:id", getUserById);

module.exports = router;
