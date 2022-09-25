// 로그인 된 상태인지 확인
module.exports = {
    async isLoggedIn(req, res, next) {
      if (req.isAuthenticated()) {
        next();
      } else {
        res.status(403).send('로그인이 필요합니다');
      }
    },
    async isNotLoggedIn(req, res, next) {
      if (!req.isAuthenticated()) {
        next();
      } else {
        res.status(403).send('이미 로그인이 되어 있습니다.');
      }
    },
  }