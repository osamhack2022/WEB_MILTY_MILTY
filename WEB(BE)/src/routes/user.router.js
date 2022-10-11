const express = require('express');
const router = express.Router();
const passport = require('passport');


router.get('/', function (req, res) {
  req.sendFile(path.join(__dirname, '../../WEB(FE)/public/index.html'))
});


router.get('*', function (req, res) {
  req.sendFile(path.join(__dirname, '../../WEB(FE)/public/index.html'))
});

module.exports = router;