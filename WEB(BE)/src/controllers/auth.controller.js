/* eslint-disable no-unused-vars */
/* eslint-disable prefer-const */
/* eslint-disable camelcase */
const bcrypt = require('bcryptjs');
const passport = require('passport');
const jwt = require('jsonwebtoken');
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
    checked,
  } = req.body;
  // 비밀번호 암호화
  user_password = bcrypt.hashSync(user_password);

  // 기존 아이디 존재 확인
  const id = await Users.findOne({ where: { usr_id: user_id } });
  console.log('########## ID :  ', id, 'checked : ', checked, '######## \n');

  try {
    if (!id) {
      // 가입할 때 이미 존재하는 id인지, 그리고 관리자 권한을 체크 안했는지 확인되면 병사로 가입
      // 존재하지 않으면 회원가입 저장

      await Users.create({
        usr_name: user_name,
        usr_id: user_id,
        usr_password: user_password,
        usr_birthday: user_birthday,
        usr_division: user_division,
        usr_division_code: user_division_code,
        usr_class: user_class,
        classification: checked ? 0 : 1,
        // 가입할 때 이미 존재하는 id인지, 그리고 관리자 권한을 체크 했는지 확인되면 관리자로 가입 요청
        // (추후 DB에서 검토 후 classification: true로 바꾸면 관리자로 로그인)
        usr_discharge_date: user_discharge_date,
      })
        .then(() => {
          return res.status(200).json('register success');
          // res.send('SUCCESS');
        })
        .catch(err => {
          throw err;
        });
    } else throw new Error('create error');
  } catch (err) {
    console.log('ERROR: ', err);
    return res.status(401).json('ID is already taken.');
  }
};
const SECERT_JWT = process.env.SECERT_JWT || 'OSAM2022-MILLY-SECERT-TOKEN';
const generateJWT = (id, classification) =>
  jwt.sign(
    {
      id,
      classification,
    },
    SECERT_JWT,
    {
      expiresIn: '2h',
      issuer: 'osam2022-milly',
    },
  );

exports.login = (req, res, next) => {
  // ID PASS 검사
  const token = generateJWT(req.body.user_id, req.body.user_class);
  res.status(200).json({
    result: 'success',
    user: {
      user_pid: req.user.usr_pid,
      user_id: req.user.usr_id,
      user_name: req.user.usr_name,
      user_birthday: req.user.usr_birthday,
      user_division: req.user.usr_division,
      user_division_code: req.user.usr_division_code, // user_division_code 를 통해 특정 부대의 페이지에만 접근 가능하도록 설정
      user_class: req.user.usr_class,
      user_discharge_date: req.user.usr_discharge_date,
      classification: req.user.classification, // 1이면 Front 라우터에서 admin 페이지로, 2이면 user main 페이지로, null이면 로그인 못하게! => token 비교가 더 나음.
    },
    token,
  });
  next();
};

exports.authToken = (req, res, next) => {
  const token = req.headers.authorization;
  try {
    const result = jwt.verify(token, SECERT_JWT);
    console.log(result);
    if (typeof next === 'function') next();
    // 검증 성공시 응답.
    return res.status(200).json({
      id: result.id,
      classification: result.classification,
      message: 'Verify token',
    });
  } catch (err) {
    // 검증에 실패하거나 토큰이 만료시 응답.
    return res.status(401).json({ message: 'Wrong token' });
  }
};

exports.set_user_info = async (req, res) => {
  const {
    user_id,
    user_pid,
    user_password,
    user_name,
    user_birthday,
    user_division,
    user_division_code,
    user_class,
    user_discharge_date,
  } = req.body;
  const encrypted_user_password = bcrypt.hashSync(user_password);

  try {
    await Users.update(
      {
        usr_name: user_name,
        usr_id: user_id,
        usr_password: encrypted_user_password,
        usr_birthday: user_birthday,
        usr_division: user_division,
        usr_division_code: user_division_code,
        usr_class: user_class,
        usr_discharge_date: user_discharge_date,
      },
      {
        where: { usr_pid: user_pid },
      },
    );

    const token = generateJWT(user_id, user_class);

    res.status(200).json({
      result: 'success',
      user: {
        user_pid,
        user_id,
        user_name,
        user_birthday,
        user_division,
        user_division_code,
        user_class,
        user_discharge_date,
      },
      token,
    });
  } catch (err) {
    console.warn(err);
    res.status(200).json({
      result: 'fail',
    });
  }
};
