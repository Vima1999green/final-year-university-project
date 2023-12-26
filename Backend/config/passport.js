const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');
const keys = require('./keys');
const User = require('../model/userModel')
const passport = require('passport');

const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey

module.exports = passport => {
    passport.use(
        new JwtStrategy(opts, (jwt_payload, done) => {
            User.findById(jwt_payload.id)
                .then(user=>{
                    if(user) return done
                    (null,
                    user={
                        id:user.id,
                        firstName:user.firstName,
                        email:user.email,
                        userType:user.userType
                    })
                    else return done(null,false)
                })
                .catch(error=>console.log(error))
        }))
}
