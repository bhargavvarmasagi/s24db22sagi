var Balls = require('../models/Balls');
// List of all Balls
exports.balls_list = function(req, res) {
res.send('NOT IMPLEMENTED: Balls list');
};
// for a specific Ball.
exports.balls_detail = function(req, res) {
res.send('NOT IMPLEMENTED: Balls detail: ' + req.params.id);
};
// Handle Balls create on POST.
exports.balls_create_post = function(req, res) {
res.send('NOT IMPLEMENTED: Balls create POST');
};
// Handle Balls delete from on DELETE.
exports.balls_delete = function(req, res) {
res.send('NOT IMPLEMENTED: Balls delete DELETE ' + req.params.id);
};
// Handle Balls update form on PUT.
exports.balls_update_put = function(req, res) {
res.send('NOT IMPLEMENTED: Balls update PUT' + req.params.id);
};

//List of all Balls
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

//Handle Balls create on POST.
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

//for a specific Ball.
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


//Handle Balls update form on PUT.
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

// Handle Balls delete on DELETE.
exports.balls_delete = async function(req, res) {
    console.log("delete " + req.params.id)
    try {
    result = await Balls.findByIdAndDelete( req.params.id)
    console.log("Removed " + result)
    res.send(result)
    } catch (err) {
    res.status(500)
    res.send(`{"error": Error deleting ${err}}`);
    }
    };

//Handle a show one view with id specified by query
exports.balls_view_one_Page = async function(req, res) {
console.log("single view for id " + req.query.id)
try{
result = await Balls.findById( req.query.id)
res.render('balldetail',
{ title: 'Ball Detail', toShow: result });
}
catch(err){
res.status(500)
res.send(`{'error': '${err}'}`);
}
};

//Handle building the view for creating a ball.
// No body, no in path parameter, no query.
// Does not need to be async
exports.balls_create_Page = function(req, res) {
console.log("create view")
try{
res.render('ballcreate', { title: 'Ball Create'});
}
catch(err){
res.status(500)
res.send(`{'error': '${err}'}`);
}
};

//Handle building the view for updating a costume.
// query provides the id
exports.balls_update_Page = async function(req, res) {
console.log("update view for item "+req.query.id)
try{
let result = await Balls.findById(req.query.id)
res.render('ballupdate', { title: 'Ball Update', toShow: result });
}
catch(err){
res.status(500)
res.send(`{'error': '${err}'}`);
}
};

// Handle a delete one view with id from query
exports.balls_delete_Page = async function(req, res) {
console.log("Delete view for id " + req.query.id)
try{
result = await Balls.findById(req.query.id)
res.render('balldelete', { title: 'Ball Delete', toShow:
result });
}
catch(err){
res.status(500)
res.send(`{'error': '${err}'}`);
}
};

    

    


