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

//Handle Costume create on POST.
exports.balls_create_post = async function(req, res) {
console.log(req.body)
let document = new Balls();
// We are looking for a body, since POST does not have query parameters.
// Even though bodies can be in many different formats, we will be picky
// and require that it be a json object
// {"costume_type":"goat", "cost":12, "size":"large"}
document.ball_type = req.body.ball_type;
document.cost = req.body.cost;
document.material = req.body.material;
try{
let result = await document.save();
res.send(result);
}
catch(err){
res.status(500);
res.send(`{"error": ${err}}`);
}
};

//for a specific Costume.
exports.balls_detail = async function(req, res) {
console.log("detail" + req.params.id)
try {
result = await Balls.findById( req.params.id)
res.send(result)
} catch (error) {
res.status(500)
res.send(`{"error": document for id ${req.params.id} not found`);
}
};


//Handle Costume update form on PUT.
exports.balls_update_put = async function(req, res) {
console.log(`update on id ${req.params.id} with body
${JSON.stringify(req.body)}`)
try {
let toUpdate = await Balls.findById( req.params.id)
// Do updates of properties
if(req.body.ball_type)
toUpdate.ball_type = req.body.ball_type;
if(req.body.cost) toUpdate.cost = req.body.cost;
if(req.body.material) toUpdate.material = req.body.material;
let result = await toUpdate.save();
console.log("Sucess " + result)
res.send(result)
} catch (err) {
res.status(500)
res.send(`{"error": ${err}: Update for id ${req.params.id}
failed`);
}
};


