const mongoose = require("mongoose")
const ballsSchema = mongoose.Schema({
ball_type: String,
cost: Number,
material: String
})
module.exports = mongoose.model("balls",
ballsSchema)