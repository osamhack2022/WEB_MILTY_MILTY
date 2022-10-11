const express = require('express');
const app = express();
const router = express.Router();
const userRouter = require('./user.router');
const apiRouter = require('./api.router');

router.use('/', userRouter);

app.use('/api', apiRouter);

module.exports = router;
