var express = require('express');
var passport = require('./../lib/auth');
var router = express.Router();

/* GET login listing. */
router.get('/login', function(req, res, next) {
  res.render('auth/login', {});
});

module.exports = router;
