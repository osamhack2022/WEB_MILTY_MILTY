import bcrypt from "bcrypt";

const user = require("../models/index").models.user; // ! DB 미구현

// eslint-disable-next-line @typescript-eslint/no-unused-vars
// ! typescript에선 절대로 any 남발 금지
const localSignup = async (req: any, res: any, next: any) => {
  const { us_code, us_id, us_password } = req.body;
  const exCode = await user.findOne({ where: { us_code } }); // ex: us_220112_123456
  if (exCode) {
    return "회원가입이 이미 되어 있습니다.";
  }
  const name = us_id;
  const hash = await bcrypt.hash(us_password, 12);
  await user.create({
    us_code,
    us_id,
    us_name: name,
    us_password: hash,
    us_admin: "N",
    us_workspace: "us_220112_123456",
  });
  return "회원가입 완료";
};

export default localSignup;
