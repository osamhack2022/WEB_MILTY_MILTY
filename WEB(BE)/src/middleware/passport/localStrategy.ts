import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcrypt";

const user = require("../models/index").models.user;

// 4. LocalStrategy 실행하고, done()을 호출하면,
// 다시 passport.authenticate() 라우터로 돌아가 다음 미들웨어 실행
export default () => {
  passport.use(
    new LocalStrategy(
      {
        // Front-End의 form 태그에서 요청된 값들이 (req.body.*) 오게 된다.
        usernameField: "us_id", // (= req.body.us_id) username에 대한 받아오는 값
        passwordField: "us_password", // (= req.body.password) password에 대한 받아오는 값
      },
      async (us_id, us_password, done) => {
        try {
          const exUser = await user.findOne({ where: { us_id } }); // username을 기반으로 DB에 값이 있는지 조회를 한 후, 해당 유저가 없는지 확인
          if (exUser) {
            const result = await bcrypt.compare(
              us_password,
              exUser.us_password
            ); // 암호화

            if (result) {
              done(null, exUser); // 성공 -> done() 호출
            } else {
              done(null, false, { message: "비밀번호가 일치하지 않습니다." });
            }
          } else {
            // DB에 해당 계정이 없을 경우
            done(null, false, { message: "승인되지 않은 장병입니다." });
          }
        } catch (error) {
          // 에러 발생시
          console.error(error);
          done(error);
        }
      }
    )
  );
};
