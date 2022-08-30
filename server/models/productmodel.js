const mongoose=require("mongoose")
const productSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true,
    },
    price:{
        type:String,
        required:true,
    },
    productid:{
        type:String,
        required:true
    }
})
const productModel=mongoose.model("products",productSchema)
module.exports=productModel