const mongoose = require("mongoose")

const ballsSchema = mongoose.Schema({
ball_type: {
    type: String,
    required: true,
    minlength:3
},
cost: {
    type:Number,
    required: true,
    min: 0,
    max:100
},
material: {
    type: String,
    required: true,
    minlength:4
}
})

module.exports = mongoose.model("balls",
ballsSchema)