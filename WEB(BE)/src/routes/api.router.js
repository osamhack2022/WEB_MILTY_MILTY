const express = require('express');

const router = express.Router();
const passport = require('passport');
const { join } = require('../controllers/user');
const { duty } = require('../controllers/make_duty');
const { user_request } = require('../controllers/user_request');
//https://jaeiko-osamhack2022-web-milty-milty-qg47pxgg975h47xw-5000.githubpreview.dev/main
// login 데이터 받는 곳
router.post(
  '/login',
  passport.authenticate('local', {
    failureMessage: false,
  }),
  function (req, res) {
    // If this function gets called, authentication was successful.
    // `req.user` contains the authenticated user.
    console.log(":::::::::::::::::::" + req.user.user_id);
    res.status(200).json("성공!");
    /*
    res.status(200).json({ classification: 'admin' });  //관리자 페이지로 이동
    res.status(200).json({ classification: 'user' });  //유저 페이지 이동
    */
  },
);

// 로그아웃
router.get('/logout', function (req, res) {
  console.log("LOGOUT TRY");
  req.logout();
  res.status(200).json('logout');
});


// 회원가입 진행
router.post('/register', join); // register 데이터 받는 곳
//근무 생성
router.post('/make_duty', duty); //근무 생성 데이터 받는 곳
//유저 근무 확인 ( 한달안에 내 근무가 언제있는지)

//근무변경 및 건의사항
router.post('/user-request-set', user_request); //근무변경 및 건의사항 정보 넣기 / 하는중
router.post('/user-request-get', user_request); //근무변경 및 건의사항 정보 받기 / 하고있는중


module.exports = router;