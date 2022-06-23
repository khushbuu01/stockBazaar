const mongoose = require('mongoose')

const sharesSchema = new mongoose.Schema({
    Name: String,
    Sector: String,
    Open: Number,
    Close: Number,
    High: Number,
    Low: Number,
    "Change(%)": Number,
    Volume: String
    
})

const SharesModel = new mongoose.model("shares", sharesSchema);

exports.Shares = SharesModel;

console.log("Complied Successfully")