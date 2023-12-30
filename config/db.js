const mongoose = require("mongoose");


exports.connect = () => {
  // Connecting to the database
  mongoose
    .connect(process.env.MONGO_URI,(err)=>{
        if(err){
            console.log("err",err.message);

        }else{
            console.log("Database connected...");

        }
    })
    
};