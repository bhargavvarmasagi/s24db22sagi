var express = require('express');
var router = express.Router();
// Require controller modules.
var api_controller = require('../controllers/api');
var balls_controller = require('../controllers/Balls');
/// API ROUTE ///
// GET resources base.
router.get('/', api_controller.api);
/// COSTUME ROUTES ///
// POST request for creating a Costume.
router.post('/Balls', balls_controller.balls_create_post);
// DELETE request to delete Costume.
router.delete('/Balls/:id', balls_controller.balls_delete);
// PUT request to update Costume.
router.put('/Balls/:id', balls_controller.balls_update_put);
// GET request for one Costume.
router.get('/Balls/:id', balls_controller.balls_detail);
// GET request for list of all Costume items.
router.get('/Balls', balls_controller.balls_list);
module.exports = router;