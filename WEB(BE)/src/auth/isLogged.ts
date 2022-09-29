// 로그인 된 상태인지 확인
export const isLoggedIn = async (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(403).send("로그인이 필요합니다");
  }
};
export const isNotLoggedIn = async (req, res, next) => {
  if (!req.isAuthenticated()) {
    next();
  } else {
    res.status(403).send("이미 로그인이 되어 있습니다.");
  }
};
