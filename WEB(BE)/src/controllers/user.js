// const bcrypt = require('bcryptjs');
const User = require('../models/User');

exports.join = function (req, res) {

    let { user_id,
        user_password,
        passwordConfirmation,
        user_name,
        user_birthday,
        user_division,
        user_division_code,
        user_class,
        user_discharge_date } = req.body;

    // 비밀번호 암호화 
    // user_password = bcrypt.hashSync(user_password)

    // 회원가입 저장
    var now = new Date();

    User.create({
        usr_name: user_name,
        usr_id: user_id,
        usr_password: user_password,
        usr_birthday: user_birthday,
        usr_division: user_division,
        usr_division_code: user_division_code,
        usr_class: user_class,
        user_discharge_date: user_discharge_date,
        created_at: now
    })
        .then(() => {
            res.redirect('/');
        })
        .catch((err) => {
            throw err;
        });
}; 