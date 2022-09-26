// passport에 기본적인 설정을 담아놓는 파일
const passport = require('passport');

const local = require('./localStrategy');
const user = require('../models/index').models.user;  // DB

module.exports = () => {
  // 7. 로그인시 실행되며, req.session에 데이터를 저장 즉, 사용자 정보를 세션에 아이디로 저장함.
  // 이때 아이디 키값만 저장(메모리 최적화를 위해서), 그 다음 passport.deserializeUser()로 바로 넘어감.
  passport.serializeUser((user, done) => {
    done(null, user.us_id);
  });

  // 8. DB 조회 후 req.user 객체를 등록 후 , done() 반환하여 다시 routes/login.js의 req.login 미들웨어로 다시 돌아간다.
  // 매 요청시 실행됨. 즉, 세션에 저장한 아이디를 통해 사용자 정보를 불러옴.
  passport.deserializeUser((us_id, done) => {
    user.findOne({ where: { us_id } })
      .then(user => done(null, user))
      .catch(err => done(err));
  });

  local();
};