const User = require('../models/users.model');
const Duty = require('../models/duty.model');
const Timeslot = require('../models/timeslot.model');
const Duty_Schedule = require('../models/duty_schedule.model');
const Exempt = require('../models/exempt.model');
const { Op } = require('sequelize');


// 근무 종류 생성(구현 완료)
exports.set_duty = async function (req, res) {
  let {
    usr_division_code, // 부대 코드
    duty_name, // 근무 종류
    duty_people_num, // 시간대별 근무 투입 인원 수
  } = req.body;

  Duty.create({
    usr_division_code: usr_division_code,  // Front에 있는 현재 로그인된 부대 관리자의 부대코드를 활용하여 근무 부대코드에 저장
    duty_name: duty_name,
    duty_people_num: duty_people_num
  })
    .then(() => {
      return res.status(200).json({ result: 'success' });
    })
};

// 근무 종류 조회(구현 완료)
exports.get_duty = async function (req, res) {
  let {
    usr_division_code,
  } = req.body;
  const data = await Duty.findAll({ where: { usr_division_code: usr_division_code } });

  console.log('근무 종류 조회 : ', data);

  res.status(200).json({ result: 'success', duty: data });
};

// 경작서 틀 생성(구현 완료)
exports.set_duty_timeslot = async function (req, res) {
  let {
    duty_pid,
    timeslot,
  } = req.body;

  // 기존에 있던 해당 Duty에 대한 Timeslot 삭제
  const existed_timeslot = await Timeslot.findOne({ where: { duty_pid: duty_pid } });
  if (existed_timeslot) {
    Timeslot.destroy({ where: { duty_pid: duty_pid } });
  }

  console.log(timeslot);

  // 타임슬롯 생성
  for (const t of timeslot) {
    Timeslot.create({
      timeslot_start: t.timeslot_start,
      timeslot_end: t.timeslot_end,
      duty_pid: duty_pid,
      timeslot_point: t.timeslot_point,
    });
  }

  res.status(200).json({ result: 'success' });

};

// 경작서 틀 조회(구현 완료)
exports.get_duty_timeslot = async function (req, res) {
  let {
    duty_pid
  } = req.body;
  const data = await Timeslot.findAll({ where: { duty_pid: duty_pid } });
  console.log('경작서 틀 조회 : ', data);
  return res.status(200).json({ result: 'success', timeslot: data });
};

// 해당 날짜의 경작서 틀 생성(민철님 작업)
exports.set_duty_schedule = async function (req, res) {
  let {
    user_division_code,           // 근무 PID
    date,
  } = req.body;

  // 근무자 리스트 생성
  duty_user_list = User.findAll({
    where: {
      usr_pid: { [Op.ne]: Exempt.usr_pid }, // Exempt.usr_pid와 같지 않은 유저들 목록 불러서 저장
    },
  });

  Duty_Schedule.create({
    duty_schedule_division_code: user_division_code,
    duty_schedule_date: date,
  })
    .then(() => {
      return res.status(200).json('duty schedule setting success');
    })
    .catch(err => {
      throw err;
    });
};

// 해당 날짜의 근무표 조회(민철님 작업)
exports.get_duty_schedule = async function (req, res) {
  let {
    duty_pid,
    usr_division_code,           // 근무 PID
    date
  } = req.body;
};

// 본인(병사)의 근무 스케줄 조회(수정중)
exports.get_user_duty_schedule = async function (req, res) {
  let {
    user_pid,
    user_division_code,
  } = req.body;

  const user_duty_data = Duty_Schedule.findAll(
    {
      where: {
        usr_pid: user_pid,
        duty_schedule_division_code: user_division_code,
      }
    });
  // 여기서 타임슬롯 PID를 불러와야 한다.


  res.status(200).json({ result: 'success', user_duty_data });
};