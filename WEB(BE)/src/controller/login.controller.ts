// localLogin과 localSignup, logout에 대한 요청을 받는 router

import express from "express";
import passport from "passport";
import { isLoggedIn, isNotLoggedIn } from "../auth/isLogged";
import loginService from "../service/loginService";

const router = express.Router();

// 먼저 localLogin 요청 전에 isNotLoggedIn()을 실행하여 로그인 여부를 확인해야 한다.
// 만약 로그인이 되어 있다면 오류메세지를 던진다.

// <로그인>
// 1. 로그인 요청 -> 2. authenticate에서 passport/localStrategy.js에서 passport.use 호출
router.post("/localLogin", isNotLoggedIn, async (req, res, next) => {
  passport.authenticate("local", (authError, user, info) => {
    if (authError) {
      // DB 연결 실패 등의 에러가 나타났을때의 예외처리를 하는 부분
      console.error(authError);
      res.status(500);
      return next(authError);
    }
    if (!user) {
      // 해당 유저가 DB에 없을 경우에 대한 예외처리
      res.status(500);
      return res.send(info.message);
    }
    return req.login(user, (loginError) => {
      // 5. done() 정보를 토대로, 로그인 성공 시 사용자 정보 객체와 함께 req.login()를 자동으로 호출
      // 6. req.login 메서드가 passport.serializeUser() 호출 (passport/index.js)
      if (loginError) {
        console.error(loginError);
        res.status(500);
        return next(loginError);
      }
      return res.send(user);
    });
  })(req, res, next);
});

//<로그아웃>
router.get("/logout", isLoggedIn, (req, res) => {
  try {
    req.logout();
    req.session.destroy(() => {
      // 응답에 쿠키를 강제로 없애는 method(안정성을 보장할 수 없어서 이 부분은 추후에 확인해봐야 할 것 같음.)
      res.clearCookie("connect.sid");
      res.status(200).send("로그아웃 되었습니다..");
    });
  } catch (error) {
    res.status(500);
    next(error);
  }
});

// <회원가입>
router.post("/localSignup", isNotLoggedIn, async (req, res, next) => {
  try {
    const str = await loginService.localSignup(req, res, next);
    if (str === "이미 등록되어 있습니다.") throw new Error(str);
    res.status(200).send(str);
  } catch (error) {
    res.status(500);
    next(error);
  }
});

export default router;
function next(error: unknown) {
  throw new Error("Function not implemented.");
}
