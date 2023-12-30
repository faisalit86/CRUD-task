const express = require('express');

const app=express()
const dotenv=require("dotenv") // configure env
dotenv.config()
const DB= require("./config/db") // configure Database
DB.connect()
const bodyParser = require("body-parser")
const multer=require("multer")
const cors= require("cors")
const serverless=require("serverless-http")
const path=require("path")
const port=process.env.PORT||2000
const router= express.Router()
// ,,,,,,,,,,,,,,,,,,,,,,,,,
//    Middlewares
// ,,,,,,,,,,,,,,,,,,,,,,,,,

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json())
app.use("/public",express.static("public"))
// ,,,,,,,,,,,,,,,,,,,,,,,,,,,,,
//     Routes
// ,,,,,,,,,,,,,,,,,,,,,,,,,,,,,
app.use('/api/user',require("./routes/User/userRoutes"))
app.use("/api/", router);


// ,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,
// Server config
// ,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,

app.listen(port,()=>{
    console.log(`Server listening on ${port}`)
})

// app.use(`/.netlify/functions/api`, router);
//
// module.exports = app;
// module.exports.handler = serverless(app);