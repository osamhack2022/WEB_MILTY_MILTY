/* eslint-disable no-unused-vars */
/* eslint-disable prefer-const */
/* eslint-disable camelcase */
const bcrypt = require('bcryptjs');
const Users = require('../models/users.model');

exports.register = async function (req, res) {
  let {
    user_id,
    user_password,
    user_name,
    user_birthday,
    user_division,
    user_division_code,
    user_class,
    user_discharge_date,
  } = req.body;
  // 비밀번호 암호화
  user_password = bcrypt.hashSync(user_password);

  // 기존 아이디 존재 확인
  const id = await Users.findOne({ where: { usr_id: user_id } });
  console.log('########## ID :  ', id, '######## \n');
  if (id == null) {
    // 존재하지 않으면 회원가입 저장
    let user = Users.create({
      usr_name: user_name,
      usr_id: user_id,
      usr_password: user_password,
      usr_birthday: user_birthday,
      usr_division: user_division,
      usr_division_code: user_division_code,
      usr_class: user_class,
      usr_discharge_date: user_discharge_date,
    })
      .then(() => {
        return res.status(200).json('register success');
        // res.send('SUCCESS');
      })
      .catch(err => {
        throw err;
      });
  } else return res.status(401).json('ID is already taken.');
};