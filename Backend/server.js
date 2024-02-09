const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const passport = require('passport')
const userRoutes = require('./routes/api/userRoutes')
const facilityRoutes = require('./routes/api/facilityRoutes')
const cors = require('cors')
const path = require('path')
const bookingRoutes = require('./routes/api/bookingRoutes')

const dbUrl = require('./config/keys').mongoUrl

const app = express()

mongoose.connect(dbUrl)
    .then(() => {
        console.log('connected to the database')
    })
    .catch((error) => {
        console.log(error.message)
    })
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//passport midleware
app.use(passport.initialize());
//passport config
require('./config/passport')(passport);

app.use('', (req, res, next) => {
    console.log(req.url)
    next()
})

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

app.use('/api/users', userRoutes)
app.use('/api/facility', facilityRoutes)
app.use('/api/booking', bookingRoutes)

app.listen(process.env.PORT || 4000, () => {
    console.log('listeneing to the server')
})