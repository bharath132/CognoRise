const mongoose= require('mongoose')


const itemsschema= new mongoose.Schema({
    id:String,
    item:String
})


const items = mongoose.model("items",itemsschema)

module.exports=items