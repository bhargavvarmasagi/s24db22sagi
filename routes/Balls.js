var express = require('express');
const balls_controlers= require('../controllers/Balls');
var router = express.Router();
/* GET costumes */
router.get('/', balls_controlers.balls_view_all_Page );

/* GET detail ball page */
router.get('/detail', balls_controlers.balls_view_one_Page);

/* GET create ball page */
router.get('/create', balls_controlers.balls_create_Page);

/* GET create update page */
router.get('/update', balls_controlers.balls_update_Page);

/* GET delete ball page */
router.get('/delete', balls_controlers.balls_delete_Page);

module.exports = router;
