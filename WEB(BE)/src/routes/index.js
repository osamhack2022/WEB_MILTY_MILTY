const express = require('express');

const router = express.Router();
const userRouter = require('./user.router');
const apiRouter = require('./api.router');

router.use('/', userRouter);

router.use('/api', apiRouter);

module.exports = router;
