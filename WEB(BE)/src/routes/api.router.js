const express = require('express');

const router = express.Router();
const passport = require('passport');
const { register } = require('../controllers/auth.controller');
const { set_duty, get_duty, set_duty_timeslot, get_duty_timeslot, set_duty_schedule, get_duty_schedule } = require('../controllers/duty');
const { get_check_count } = require('../controllers/check_count');
const { user_set_request } = require('../controllers/user_request');
const { user_get_request } = require('../controllers/user_request');

// #### Auth region ####
// login 데이터 받는 곳
router.post(
  '/login',
  passport.authenticate('local', {
    failureMessage: false,
  }),
  function (req, res) {
    // If this function gets called, authentication was successful.
    // `req.user` contains the authenticated user.
    console.log(
      '로그인 성공!',
      '아이디 :', req.user.usr_id,
      '이름 :', req.user.usr_name,
      '생일 :', req.user.usr_birthday,
      '부대 :', req.user.usr_division,
      '부대 코드: ', req.user.usr_division_code,
      '신분: ', req.user.usr_class,
      '전역일: ', req.user.usr_discharge_date,
    );
    res.status(200).json({
      result: 'success',
      user: {
        user_id: req.user.usr_id,
        user_name: req.user.usr_name,
        user_birthday: req.user.usr_birthday,
        user_division: req.user.usr_division,
        user_division_code: req.user.usr_division_code,
        user_class: req.user.usr_class,
        user_discharge_date: req.user.usr_discharge_date,
      },
    });

    /*
    res.status(200).json({ classification: 'admin' });  //관리자 페이지로 이동
    res.status(200).json({ classification: 'user' });  //유저 페이지 이동
    */
  },
);

// 로그아웃
router.get('/logout', function (req, res) {
  console.log('LOGOUT TRY');
  req.logout();
  res.status(200).json('logout');
});

// 회원가입 진행
router.post('/register', register); // register 데이터 받는 곳
// #### End region ####


// #### Duty region ####
// 근무 생성
router.post('/set-duty', set_duty); // 근무 생성 데이터 받는 곳

// 유저 근무 확인 ( 한달안에 내 근무가 언제있는지)
router.post('/get-duty', get_duty);

// 근무 시간대 생성
router.post('/set-duty-timeslot', set_duty_timeslot);

// 근무 시간대 조회
router.post('/get-duty-timeslot', get_duty_timeslot);

// 해당 날짜의 근무표 생성
router.post('/set-duty-schedule', set_duty_schedule);

// 해당 날짜의 근무표 조회
router.post('/get-duty-schedule', get_duty_schedule);

// 근무 횟수 조회
router.post('/get-check-count', get_check_count);
// #### End region ####


// #### Request region ####
// 근무변경 및 건의사항
router.post('/user-request-set', user_set_request); // 근무변경 및 건의사항 정보 넣기
router.post('/user-request-get', user_get_request); // 근무변경 및 건의사항 정보 받기 
// #### End region ####

module.exports = router;
