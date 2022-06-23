const mongoose = require('mongoose')

const signupSchema = new mongoose.Schema({
    "name": {type: String, required: true},
    "contactNo": {type: String, required: true, unique: true},
    "email": {type: String, required: true, unique: true},
    "balance": {type: Number, required: true},
    "password": {type: String, required: true},
    "investment": {type: Number, default: 0},
    "userId": String,
    portfolio: [{
        stock: String,
        qty: Number
      }]
})

const SignupModel = new mongoose.model("signup", signupSchema);

exports.Signup = SignupModel;

console.log("Complied Successfully")

//https://upstox.com/developer/api/v1/docs/?javascript#orders-details
//API key: HPTTMO4V5O80XCX0