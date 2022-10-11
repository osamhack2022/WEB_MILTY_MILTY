const express = require('express');
const app = express();
const router = express.Router();
const apiRouter = require('./api.router');

app.use('/api', apiRouter);

module.exports = router;
