// localLogin과 localSignup, logout에 대한 요청을 받는 router

const express = require('express');
const passport = require('passport');
const router = express.Router();

const { isLoggedIn, isNotLoggedIn } = require('../auth/isLogged');
const loginService = require('../service/loginService');

// 먼저 localLogin 요청 전에 isNotLoggedIn()을 실행하여 로그인 여부를 확인해야 한다.
// 만약 로그인이 되어 있다면 오류메세지를 던진다.

// 1. 로그인 요청 -> 2. authenticate에서 passport/locaStrategy.js에서 passport.use 호출
router.post('/localLogin', isNotLoggedIn, async(req, res, next) => {
  passport.authenticate('local', (authError, user, info) => {
    if (authError) {    // DB 연결 실패 등의 에러가 나타났을때의 예외처리를 하는 부분
      console.error(authError);
      res.status(500);
      return next(authError);
    }
    if (!user) {        // 해당 유저가 DB에 없을 경우에 대한 예외처리
      res.status(500);
      return res.send(info.message);
    }
    return req.login(user, (loginError) => {    // 5. done() 정보를 토대로, 로그인 성공 시 사용자 정보 객체와 함께 req.login()를 자동으로 호출
      // 6. req.login 메서드가 passport.serializeUser() 호출 (passport/index.js)
      if (loginError) {
        console.error(loginError);
        res.status(500);
        return next(loginError);
      }
      return res.send(user);
    });
  })(req, res, next);
});

module.exports = router;