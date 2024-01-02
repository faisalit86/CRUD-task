const express = require('express');

const app=express()
const dotenv=require("dotenv") // configure env
dotenv.config()
const DB= require("./config/db") // configure Database
DB.connect()
const bodyParser = require("body-parser")
const cors= require("cors")
const port=process.env.PORT||2000

// ,,,,,,,,,,,,,,,,,,,,,,,,,
//    Middlewares
// ,,,,,,,,,,,,,,,,,,,,,,,,,

app.use(cors({ origin: "*" }));
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json())
app.use("/public",express.static("public"))
// ,,,,,,,,,,,,,,,,,,,,,,,,,,,,,
//     Routes
// ,,,,,,,,,,,,,,,,,,,,,,,,,,,,,
app.use('/api/user',require("./routes/User/userRoutes"))
app.use('/api/task',require("./routes/Task/taskRoutes"))

// ,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,
// Server config
// ,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,

app.listen(port,()=>{
    console.log(`Server listening on ${port}`)
})

module.exports={app}