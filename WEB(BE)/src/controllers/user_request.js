const Request = require('../models/request.model');
const User_list_model = require('../models/users.model');

/*
`request_pid`	int	NOT NULL,
  `request_list`	varchar2(30)	NULL,
  `request_duty`	date	NULL,
  `request_reason`	varchar2(100)	NULL,
  `request_day`	date	NULL,
  `request_user`	int	NULL,
  `request_changes`	int	NULL
*/

/*
request_type
  0 - 건의사항 
  1 - 근무변경

request_status
  0 - 처리불가
  1 - 처리중
  2 - 처리완료
*/

// 건의사항 및 근무변경 추가(구현완료)
exports.user_set_request = async function (req, res) {
  const {
    request_type,
    duty_schedule_pid,
    request_reason,
    request_date,
    request_usr,
    request_change_usr
  } = req.body;

  console.log(
    '건의사항 및 근무변경 연결 성공!',
    '건의사항 = 0 / 근무변경 = 1 :', request_type,
    '바꿀 근무 날짜 :', duty_schedule_pid,
    '건의 내용 / 변경 사유 :', request_reason,
    '건의 날짜 / 변경 :', request_date,
    '건의 글쓴이 / 근무 변경자 PID :', request_usr,
    '근무 피변경자 PID : ', request_change_usr,
  );

  const now = new Date();
  const user_division_code = User_list_model.findOne({
    attributes: ['usr_division_code'],
    where: { usr_pid: request_usr }
  });

  // 건의사항
  if (request_type == 0) {
    Request.create({
      request_type: 0,
      request_reason: request_reason,
      request_date: now,
      request_usr: request_usr,
      request_change_usr: null, // 근무 변경 인원이 없기때문에 기본값 null으로 설정
      request_status: 1,
      request_division_code: user_division_code['usr_division_code'],
    })
      .then(() => {
        res.json({ result: 'success' });
      })
      .catch(err => {
        throw err;
      });
  }
  // 근무변경
  else if (request_type == 1) {
    request
      .create({
        request_type,
        duty_schedule_pid,
        request_reason,
        request_date,
        request_usr,
        request_change_usr,
        request_status: 1,
        request_division_code: user_division_code['usr_division_code'],
      })
      .then(() => {
        res.send('근무변경(요청) 완료.');
      })
      .catch(err => {
        throw err;
      });
  } else {
    console.log('request_type 값 오류');
  }
};




// 유저 건의사항 및 근무 요청사항 조회(구현완료)
exports.user_get_request = async function (req, res) {
  const {
    usr_pid
  } = req.body;

  const requests = await Request.findAll({ where: { request_usr: usr_pid } });

  console.log('request  내용 : ', requests);

  res.status(200).json({
    result: 'success',
    request: requests,
  });
}

//같은 부대 유저 정보 받기
exports.get_user_list = async function (req, res) {
  const {
    usr_division_code
  } = req.body;

  const user_list = await User_list_model.findAll({ where: { usr_division_code: usr_division_code } });

  console.log('user_list  내용 : ', user_list);

  res.status(200).json({
    result: 'success',
    user_list: user_list,
  });

}