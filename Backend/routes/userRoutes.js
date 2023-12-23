const express = require('express')

const router  = express.Router()

const User  = require('../model/usermodel')

router.get('/',(req,res)=>{
    User.find()
        .then((result)=>{
                res.send({Users:result})
        })

        .catch((err)=>{
            console.log(err)
        })
})

module.exports = router