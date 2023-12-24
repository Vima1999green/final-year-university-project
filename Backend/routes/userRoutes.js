const express = require('express')

const router  = express.Router()

const User  = require('../model/usermodel')

router.get('/getUsers',(req,res)=>{
    User.find()
        .then((result)=>{
                res.send({Users:result})
        })

        .catch((err)=>{
             return res.status(400).json({message:err})
        })
})

module.exports = router