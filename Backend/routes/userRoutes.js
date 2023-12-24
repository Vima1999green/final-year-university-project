const express = require('express')

const router  = express.Router()

const user = require('../model/userModel')

router.get('/',(req,res)=>{
    user.find()
        .then((users)=>{
                res.send(users)
        })

        .catch((error)=>{
            console.log(error)
        })
})

module.exports = router