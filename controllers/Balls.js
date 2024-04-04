var Balls = require('../models/Balls');
// List of all Costumes
exports.balls_list = function(req, res) {
res.send('NOT IMPLEMENTED: Balls list');
};
// for a specific Costume.
exports.balls_detail = function(req, res) {
res.send('NOT IMPLEMENTED: Balls detail: ' + req.params.id);
};
// Handle Costume create on POST.
exports.balls_create_post = function(req, res) {
res.send('NOT IMPLEMENTED: Balls create POST');
};
// Handle Costume delete from on DELETE.
exports.balls_delete = function(req, res) {
res.send('NOT IMPLEMENTED: Balls delete DELETE ' + req.params.id);
};
// Handle Costume update form on PUT.
exports.balls_update_put = function(req, res) {
res.send('NOT IMPLEMENTED: Balls update PUT' + req.params.id);
};

//List of all Costumes
exports.balls_list = async function(req, res) {
try{
theBalls = await Balls.find();
res.send(theBalls);
}
catch(err){
res.status(500);
res.send(`{"error": ${err}}`);
}
};

// VIEWS
// Handle a show all view
exports.balls_view_all_Page = async function(req, res) {
try{
theBalls = await Balls.find();
res.render('balls', { title: 'Balls Search Results', results: theBalls });
}
catch(err){
res.status(500);
res.send(`{"error": ${err}}`);
}
};
