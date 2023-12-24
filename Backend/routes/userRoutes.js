const express = require('express')
const User = require('../model/userModel')
const bcrypt = require('bcrypt')

const router  = express.Router()

router.get('/',async (req,res)=>{
    await User.find()
        .then((users)=>{
            res.send(users)
        })
        .catch((err)=>{
            res.json({error:err})
        })
})
//Reister Users
router.post('/',async (req,res)=>{
    bcrypt.genSalt(10,(err,salt)=>{
        bcrypt.hash(req.body.password,salt,(err,hash)=>{
            User.create({
                firstName:req.body.firstName,
                lastName:req.body.lastName,
                email:req.body.email,
                password:hash,
                userType:req.body.userType
            })
            .then(user=>res.send(user))
            .catch(error=>res.send(error))
        })
    })
})
//password checking
const checkPassword=(raw,hash)=>{
    return bcrypt.compareSync(raw,hash);
}
//authenticate user


module.exports = router