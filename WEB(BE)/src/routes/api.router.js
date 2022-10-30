/* eslint-disable camelcase */
const express = require('express');
const moment = require('moment');
const passport = require('passport');

const router = express.Router();
const {
  register,
  login,
  authToken,
  set_user_info,
} = require('../controllers/auth.controller');
const {
  set_duty,
  get_duty,
  set_duty_timeslot,
  get_duty_timeslot,
  set_duty_schedule,
  get_duty_schedule,
  get_user_duty_on_dashboard,
  get_user_duty_schedule,
} = require('../controllers/duty');
const { get_check_count } = require('../controllers/check_count');
const {
  user_get_report,
  admin_get_report,
  admin_set_report,
} = require('../controllers/report');
const {
  admin_set_duty_request,
  admin_get_duty_request,
  user_set_duty_request,
  get_user_list,
} = require('../controllers/request');
const { set_user_exempt, get_user_exempt } = require('../controllers/exempt');

// #region Auth
/**
* @swagger
* /login:
*   post:
*     tags: [User Auth]
*     summary: 로그인 로직 처리
*     parameters:
*       - name: ID
*         in: Post
*         type: string
*         description: 사용자 군번
*       - name: password
*         in: Post
*         type: string
*         description: 사용자 비밀번호
*     responses:
*       '200':
*         description: 로그인 성공
*       '400':
*         description: 로그인 정보 오류
*     
*/
router.post(
  '/login',
  passport.authenticate('local', {
    failureMessage: false,
  }),
  login,
);

// 로그아웃
/**
* @swagger
* /logout:
*   get:
*     tags: [User Auth]
*     summary: 로그아웃 처리
*     parameters:
*     responses:
*       "200":
*         description: 로그아웃 성공
*     
*/
router.get('/logout', function (req, res) {
  console.log('LOGOUT TRY');
  req.logout();
  res.status(200).json('logout');
});

// 회원가입 진행
/**
* @swagger
* /register:
*   post:
*     tags: [User Auth]
*     summary: 신규 계정 생성
*     parameters:
*       - name: name
*         in: Post
*         type: string
*         description: 이름
*       - name: ID
*         in: Post
*         type: string
*         description: 군번
*       - name: password
*         in: Post
*         type: string
*         description: 비밀번호
*       - name: birthday
*         in: Post
*         type: string
*         format: date
*         description: 생년월일
*       - name: division
*         in: Post
*         type: string
*         description: 소속부대
*       - name: division_code
*         in: Post
*         type: integer
*         description: 부대코드
*       - name: rank
*         in: Post
*         type: string
*         enum: [이병, 일병, 상병, 병장]
*         description: 계급
*       - name: discharge_date
*         in: Post
*         type: string
*         format: date
*         description: 전역일
*       - name: isAdmin
*         in: Post
*         type: boolean
*         description: 관리자 여부
*     responses:
*       "200":
*         description: 회원가입 성공
*     
*/
router.post('/register', register); // register 데이터 받는 곳

router.get('/authtoken', authToken);

// 사용자 정보 변경
/**
* @swagger
* /set-user-info:
*   post:
*     tags: [User Auth]
*     summary: 회원정보 변경
*     parameters:
*       - name: name
*         in: Post
*         type: string
*         description: 이름
*       - name: ID
*         in: Post
*         type: string
*         description: 군번
*       - name: password
*         in: Post
*         type: string
*         description: 비밀번호
*       - name: birthday
*         in: Post
*         type: string
*         format: date
*         description: 생년월일
*       - name: division
*         in: Post
*         type: string
*         description: 소속부대
*       - name: division_code
*         in: Post
*         type: integer
*         description: 부대코드
*       - name: rank
*         in: Post
*         type: string
*         enum: [이병, 일병, 상병, 병장]
*         description: 계급
*       - name: discharge_date
*         in: Post
*         type: string
*         format: date
*         description: 전역일
*     responses:
*       "200":
*         description: 정보 변경 성공
*     
*/
router.post('/set-user-info', set_user_info);

// #endregion


// #### Duty region ####
// 근무 생성
/**
* @swagger
* /set-duty:
*   post:
*     tags: [Duty]
*     summary: 근무 생성
*     parameters:
*       - name: name
*         in: Post
*         type: string
*         description: 이름
*     responses:
*       "200":
*         description: 근무 생성 성공
*         schema:
*           type: object
*           properties:
*             duty_pid:
*               type: integer
*               description: 자동 생성 값
*               example: 1
*             user_division_code:
*               type: integer
*               description: 부대 코드
*               example: 1234
*             duty_name:
*               type: string
*               description: 근무 종류
*               example: CCTV
*             duty_people_num:
*               type: integer
*               description: 시간대별 근무 투입 인원수
*               example: 2
*/
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
router.post('/admin/get-duty-request', admin_get_duty_request); // 근무변경 정보 받기
router.post('/admin/set-duty-request', admin_set_duty_request); // 근무변경 및 건의사항 정보 넣기
router.post('/user/set-duty-request', user_set_duty_request); // 근무변경 및 건의사항 정보 넣기

// 건의사항
router.post('/user/get-report', user_get_report); // 사용자 건의사항 정보 받기
router.post('/admin/get-report', admin_get_report); // 관리자 건의사항 정보 받기
router.post('/admin/set-report', admin_set_report); // 관리자 건의사항 처리 상태 설정
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
