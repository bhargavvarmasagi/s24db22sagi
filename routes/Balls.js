var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('Balls', { title: 'Search results of Balls'});
});

module.exports = router;
