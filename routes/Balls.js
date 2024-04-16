var express = require('express');
const balls_controlers= require('../controllers/Balls');
var router = express.Router();

// A little function to check if we have an authorized user and continue on or // redirect to login. 
const secured = (req, res, next) => {     
    if (req.user){       
        return next();     
    }     
        res.redirect("/login");   
    }
/* GET costumes */
router.get('/', balls_controlers.balls_view_all_Page );

/* GET detail ball page */
router.get('/detail',secured, balls_controlers.balls_view_one_Page);

/* GET create ball page */
router.get('/create',secured, balls_controlers.balls_create_Page);

/* GET create update page */
router.get('/update',secured, balls_controlers.balls_update_Page);

/* GET update ball page */
router.get('/update', secured,
balls_controlers.balls_update_Page);

/* GET delete ball page */
router.get('/delete',secured,balls_controlers.balls_delete_Page);

module.exports = router;
