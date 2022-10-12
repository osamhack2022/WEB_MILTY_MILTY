var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user.model');
const bcrypt = require('bcryptjs');

//로그인할 때마다 user_id 저장 
passport.serializeUser((user, done) => {
    done(null, user.usr_id);
})

//user_id로 유저 객체 불러오기
passport.deserializeUser((user_id, done) => {
    User.findByPk(user_id).then(user => {
        if (user) {
            done(null, user.get());
        } else {
            done(null, false);
        }
    });
})

passport.use(
    new LocalStrategy(
        {
            usernameField: "user_id",
            passwordField: "user_password",
            passReqToCallback: true,
        },
        async (req, user_id, user_password, done) => {
            User.findOne({
                where: {
                    usr_id: user_id
                }
            }).then((user) => {
                if (user && bcrypt.compareSync(user_password, user.usr_password)) {
                    return done(null, user.dataValues);
                } else {
                    return done(null, false);
                }
            }).catch(err => {
                return done(err);
            })
        }
    )
);

module.exports = passport;