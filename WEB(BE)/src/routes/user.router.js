const express = require('express');

const router = express.Router();
const passport = require('passport');

// Login(login 화면을 차라리 첫 화면으로 잡기 위해 주소를 '/'로 설정했습니다.)
router.get('/', function (req, res) {
  // localhost:3000
  res.render('user/login'); // [views 에 있는 login.ejs 실행(이 부분을 수정해서 Front단 페이지와 연결하면 됨)]
});
router.get('/register', function (req, res) {
  // localhost:3000
  res.render('user/join'); // [views 에 있는 login.ejs 실행(이 부분을 수정해서 Front단 페이지와 연결하면 됨)]
});

// 마이 페이지
router.get('/mypage', (req, res) => {
  const user = res.locals.currentUser;
  if (user === undefined) {
    // 로그인X
    res.render('user/login'); // [views 에 있는 login.ejs 실행(이 부분을 수정해서 Front단 페이지와 연결하면 됨)]
  } else {
    res.render('user/mypage'); // [views 에 있는 mypage.ejs 실행(이 부분을 수정해서 Front단 페이지와 연결하면 됨)]
  }
});

module.exports = router;
