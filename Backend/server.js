const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const userRoutes  = require('./routes/userRoutes')

const dbUrl = require('./key').mongoUrl




const app = express()

mongoose.connect(dbUrl)
    .then(()=>{
        console.log('connected to the database')
    })
    .catch((error)=>{
        console.log(error.message)
    })

app.use(bodyParser.json())

app.use('/users',userRoutes)

app.listen(process.env.PORT||4000,()=>{

        console.log('listeneing to the server')

})




