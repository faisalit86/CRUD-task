const mongoose = require("mongoose")

const UserSchema=new mongoose.Schema({
    
    email:{
        type:String,
        required:true ["email is required"],
    },
    
    password:{
        type:String,
        required:true ["email is required"],
    },
   

    // token: { type: String },
})

const UserModel= mongoose.model("User",UserSchema)
module.exports = UserModel