var express = require('express');
const balls_controlers= require('../controllers/Balls');
var router = express.Router();
/* GET costumes */
router.get('/', balls_controlers.balls_view_all_Page );
module.exports = router;
