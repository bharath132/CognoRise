const mongoose= require('mongoose')


const Userschema= new mongoose.Schema({
    email:String,
    password:String
})


const user = mongoose.model("login",Userschema)

module.exports=user