const mongoose = require('mongoose')

const freelanceSchema = mongoose.Schema({
    name : String,
    Email : {type : String,unique:true},
    Password:String,
    DOB:String,
    Mobile_no : String,
    Skills : {type:[String]},
    Portfolio:String

})

const freelanceModel = mongoose.model('freelance',freelanceSchema)
module.exports=freelanceModel