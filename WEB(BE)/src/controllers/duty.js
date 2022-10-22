const User = require('../models/users.model')
const Duty = require('../models/duty.model')
const Timeslot = require('../models/timeslot.model')
const Duty_Schedule = require('../models/duty_schedule.model')

// 근무 종류 생성(완료)
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

// 근무 종류 조회(완료)
exports.get_duty = async function (req, res) {
  let {
    usr_division_code,
  } = req.body;
  const data = await Duty.findAll({ where: { usr_division_code: usr_division_code } });

  console.log('근무 종류 조회 : ', data);

  res.status(200).json({ result: 'success', duty: data });
};

// 경작서 틀 생성(수정중)
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

  // 타임슬롯 생성
  for (let i = 0; timeslot.length; i++) {
    Timeslot.create({
      timeslot_start: timeslot.timeslot_start[i],
      timeslot_end: timeslot.timeslot_end[i],
      duty_pid: duty_pid,
      timeslot_point: timeslot.timeslot_point[i],
    });
  }

  res.status(200).json({ result: 'success' });

};

// 경작서 틀 조회(수정중)
exports.get_duty_timeslot = async function (req, res) {
  let {
    duty_pid
  } = req.body;
  const data = Timeslot.findAll({ where: { duty_pid: duty_pid } });
  console.log('경작서 틀 조회 : ', data);
  return res.status(200).json({ result: 'success', duty: data });
};

// 해당 날짜의 경작서 틀 생성(수정중))
exports.set_duty_schedule = async function (req, res) {
  let {
    user_division_code,           // 근무 PID
    date,
  } = req.body;
  const duty_type_data = Duty.findAll({ where: { usr_division_code: user_division_code } });

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

// 해당 날짜의 근무표 조회(수정중)
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

  const data = Duty.findAll({ where: { usr_division_code: usr_division_code } });
  const user = User.findAll({ where: { usr_pid: user_pid } });
  for (let i = 0; i < data.length; i++) {
    var buf = {
      date: data[i].duty_name,
      duty_name: data[i].duty_point,
      // startTime:,
      // endTime,
    };
    res.send(buf);
  };
}