const mongoose = require('mongoose')

const clientSchema = new mongoose.Schema({
    email : {type : String, unique : true},
    password : String,
    Name:String,
    DOB : String,
    mob_no : String,
    company_name : String

})

const clientModel = mongoose.model('client',clientSchema)

module.exports = clientModel;