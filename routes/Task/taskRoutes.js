const express=require("express")
const { ValidateTaskCreation } = require("../../controller/Task/task.validate")
const { addTask, updateTask, deleteTask, getOneTask, getAllUserCreatedTask } = require("../../controller/Task/TaskController")
const isUserAuthenticated = require("../../middleware/auth")

const router=express.Router()

// All GET APIs
router.get("/",isUserAuthenticated,getAllUserCreatedTask)
router.get("/get-single-task/:task_id",isUserAuthenticated,getOneTask)

// All POST APIs
router.post("/add",ValidateTaskCreation,isUserAuthenticated ,addTask)
router.post("/update/:task_id",ValidateTaskCreation,isUserAuthenticated ,updateTask)

// All DELETE APIs
router.delete("/delete/:task_id",isUserAuthenticated ,deleteTask)


module.exports=router