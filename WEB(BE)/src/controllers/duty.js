const bcrypt = require('bcryptjs');

// 근무 종류 생성
exports.set_duty = async function (req, res) {
  let {
    usr_division_code, // 부대 코드
    duty_name, // 근무 종류
    duty_people_num // 시간대별 근무 투입 인원 수
  } = req.body;


};

// 근무 종류 조회
exports.get_duty = async function (req, res) {
  let {
    usr_division_code
  } = req.body;
};

// 근무 시간대 생성
exports.set_duty_timeslot = async function (req, res) {
  let {
    duty_pid,
    timeslot_start,
    timeslot_end,
    point
  } = req.body;
};

// 근무 시간대 조회
exports.get_duty_timeslot = async function (req, res) {
  let {
    duty_pid
  } = req.body;
};

// 해당 날짜의 근무표 생성
exports.set_duty_schedule = async function (req, res) {
  let {
    usr_division_code,           // 근무 PID
    date
  } = req.body;
};

// 해당 날짜의 근무표 조회
exports.get_duty_schedule = async function (req, res) {
  let {
    duty_pid,
    usr_division_code,           // 근무 PID
    date
  } = req.body;
};

exports.duty = function () { };