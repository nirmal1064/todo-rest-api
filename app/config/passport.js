const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const User = require('../models/user');

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.SECRET_KEY;

const strategy = (passport) => {
    passport.use(
        new JwtStrategy(opts, (id, next) => {
            User.findById(id).then(user => {
                if (user) {
                    return next(null, user);
                }
                return next(null, false);
            }).catch(err => {
                console.log(err);
            });
        })
    );
}

module.exports = strategy;
