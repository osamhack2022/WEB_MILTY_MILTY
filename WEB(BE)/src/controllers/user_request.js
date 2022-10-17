const request = require('../models/request.model');
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
request_list
  0 - 건의사항 
  1 - 근무변경
request_check
  0 - 처리불가
  1 - 처리중
  2 - 처리완료
*/

// 건의사항 및 근무변경 저장
exports.user_set_request = async function (req, res) {
  const {
    request_list,
    request_duty,
    request_reason,
    request_day,
    request_user,
    request_changes,
    request_check,
    usr_pid
  } = req.body;
  // 건의사항
  if (request_list == 0) {
    var a = request
      .create({
        request_list,
        request_duty: new DATE(2000, 1, 1), // 근무 변경 날짜가 없어도 되기떄문에 기본값으로 설정
        request_reason,
        request_day,
        request_user,
        request_changes: 0, // 근무 변경 인원이 없기때문에 기본값 0으로 설정,=
        request_check: 1,
        usr_pid
      })
      .then(() => {
        res.send('건의사항(요청) 완료.');
      })
      .catch(err => {
        throw err;
      });
  }
  // 근무변경
  else if (request_list == 1) {
    var a = request
      .create({
        request_list,
        request_duty,
        request_reason,
        request_day,
        request_user,
        request_changes,
        request_check: 1,
        usr_pid
      })
      .then(() => {
        res.send('근무변경(요청) 완료.');
      })
      .catch(err => {
        throw err;
      });
  } else {
    console.log('request_list 값 오류');
  }
};

// 유저 건의사항 및 근무 요청사항 주기
exports.user_get_request = async function (req, res) {
  const {
    usr_pid
  } = req.body;
  const requests = await Users.findAll({ where: { usr_id: usr_pid } });

  for (var i = 0; i < request.length; i++) {
    var buf = {
      request_list: request[i].request_list,
      request_duty: request[i].request_duty,
      request_reason: request[i].request_reason,
      request_day: request[i].request_day,
      request_user: request[i].request_user,
      request_changes: request[i].request_changes,
      request_check: request[i].request_check
    };
    res.send(buf);
  }
}
