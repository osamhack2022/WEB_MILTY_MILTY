/* eslint-disable camelcase */
const express = require('express');
const moment = require('moment');
const passport = require('passport');

const router = express.Router();
const passport = require('passport');
const { register, login, authToken } = require('../controllers/auth.controller');
const { set_duty, get_duty, set_duty_timeslot, get_duty_timeslot, set_duty_schedule, get_duty_schedule, get_user_duty_on_dashboard, get_user_duty_schedule } = require('../controllers/duty');
const { get_check_count } = require('../controllers/check_count');
const { user_get_report, admin_get_report } = require('../controllers/report');
const { user_set_request } = require('../controllers/user_request');
const { user_get_request } = require('../controllers/user_request');
const { get_user_list } = require('../controllers/user_request');
const { set_user_exempt, get_user_exempt } = require('../controllers/exempt');

// #region Auth
router.post(
  '/login',
  passport.authenticate('local', {
    failureMessage: false,
  }),
  login,
);

// 로그아웃
router.get('/logout', function (req, res) {
  console.log('LOGOUT TRY');
  req.logout();
  res.status(200).json('logout');
});

// 회원가입 진행
router.post('/register', register); // register 데이터 받는 곳

router.get('/authtoken', authToken);

// #endregion

// #### Duty region ####
// 근무 생성
router.post('/set-duty', set_duty, function (req, res) {
  res.status(200).json({
    result: 'success',
    duty: {
      duty_pid: req.duty_pid, // 자동 생성 유니크 값
      user_division_code: req.usr_division_code, // 부대 코드
      duty_name: req.duty_name, // 근무 종류
      duty_people_num: req.duty_people_num, // 시간대별 근무 투입 인원 수
    },
  });
}); // 근무 생성 데이터 받는 곳

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

// #### get-user-duty-schedule region ####
// 본인(병사)의 근무 스케줄 조회
router.post('/get-user-duty-schedule', get_user_duty_schedule);
// #### End region ####

// #### Request region ####
// 근무변경
router.post('/set-duty-request', user_set_request); // 근무변경 및 건의사항 정보 넣기
router.post('/get-duty-request', user_get_request); // 근무변경 및 건의사항 정보 받기
// #### End region ####

// #### Exempt region ####
// 열외자 추가, 조회
router.post('/set-user-exempt', set_user_exempt);
router.post('/get-user-exempt', get_user_exempt);
// #### End region ####

// #### Exempt region ####
// 유저 대시보드
router.post('/get-user-dashboard', get_user_duty_on_dashboard);
// #### End region ####

// #### User region ####
router.post('/get-user-list', get_user_list);
// #### End region ####

module.exports = router;
