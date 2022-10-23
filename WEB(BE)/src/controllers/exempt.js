const User = require('../models/users.model');
const Exempt = require('../models/exempt.model');

// 열외자 추가
exports.set_user_exempt = async function (req, res) {
  let {
    user_pid,
    exempt_start,
    exempt_end,
    exempt_type,
  } = req.body;

  const user = await User.findOne({
    attributes: ['usr_division_code'],
    where: {
      usr_pid: user_pid,
    },
  });

  console.log(
    'user_pid :', user_pid,
    'exempt_start :', exempt_start,
    'exempt_end :', exempt_end,
    'exempt_type :', exempt_type,
    '부대코드 :', user['usr_division_code'],
  );

  Exempt.create({
    usr_pid: user_pid,
    exempt_division_code: user['usr_division_code'],
    exempt_start: exempt_start,
    exempt_end: exempt_end,
    exempt_type: exempt_type,
  })
    .then(() => {
      return res.status(200).json({ result: "success" });
    })
};


// admin 페이지 열외자 조회
exports.get_user_exempt = async function (req, res) {
  let {
    user_division_code,
  } = req.body;

  const excluders = await Exempt.findAll({
    where: { exempt_division_code: user_division_code }
  });

  console.log('전체 열외자 배열 목록 : ', excluders);

  return res.status(200).json({ result: "success", exempt: excluders });
};