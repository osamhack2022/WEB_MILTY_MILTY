import express from "express";
import { createServer } from "http";
const session = require('express-session')
const passport = require('passport');

const passportConfig = require('./passport');

const app = express();

app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false,
}));

// 이 부분의 설정은 반드시 세션 설정 뒤에 사용해야 함.
app.use(passport.initialize()); // 요청에 passport 설정을 넣는다.
app.use(passport.session()); // req.session에 passport 정보를 저장한다.

/* passport 로그인 이후 과정
1. 모든 요청에 passport.session() 미들웨어가 passport/index.js의 passport.deserializeUser() 메서드를 매번 호출한다.
2. deserializeUser에서 req.session에 저장된 아이디로 데이터베이스에서 사용자 조회한다.
3. 조회된 사용자 전체 정보를 req.user 객체에 저장한다.
4. 이제부터 라우터에서 req.user를 공용적으로 사용 가능하게 된다.
*/

// 라우터(아직 구현X)
app.use('/auth', authRouter);

app.get("/", (req, res) => {
  res.send("Hello world!");
});
const server = createServer(app);
server.listen(process.env.PORT || 5000);