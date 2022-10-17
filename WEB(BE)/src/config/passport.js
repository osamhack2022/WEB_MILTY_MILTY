const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const User = require('../models/users.model');

// 로그인할 때마다 user_id 저장
passport.serializeUser((user, done) => {
    console.log('serializeUser', user)
    done(null, user.usr_id);
});

// user_id로 유저 객체 불러오기
passport.deserializeUser((id, done) => {
    console.log('deserializeUser', id);
    // req.session에 저장된 사용자 아이디를 바탕으로 DB 조회로 사용자 정보를 얻어낸 후 req.user에 저장. 
    // 즉, id를 sql로 조회해서 전체 정보를 가져오는 복구 로직이다.
    User.findOne({ where: { usr_id: id } })
        .then(console.log('deserializeUser Success!'))
        .then(user => done(null, user)) //? done()이 되면 이제 다시 req.login(user, ...) 쪽으로 되돌아가 다음 미들웨어를 실행하게 된다.
        .catch(err => done(err));
});

passport.use(
    new LocalStrategy(
        {
            usernameField: 'user_id',
            passwordField: 'user_password',
            passReqToCallback: true,
        },
        async (req, user_id, user_password, done) => {
            User.findOne({
                where: {
                    usr_id: user_id,
                },
            })
                .then(user => {
                    if (user && bcrypt.compareSync(user_password, user.usr_password)) {
                        return done(null, user.dataValues);
                    }
                    return done(null, false);
                })
                .catch(err => {
                    return done(err);
                });
        },
    ),
);

module.exports = passport;