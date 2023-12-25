const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const passport=require('passport')

const dbUrl = require('./config/keys').mongoUrl

const app = express()

mongoose.connect(dbUrl)
    .then(()=>{
        console.log('connected to the database')
    })
    .catch((error)=>{
        console.log(error.message)
    })

app.use(bodyParser.json())
//passport midleware
app.use(passport.initialize());
//passport config
require('./config/passport')(passport);

app.use('/api/users',require('./routes/api/userRoutes'))

app.listen(process.env.PORT||4000,()=>{
        console.log('listeneing to the server')
})




