const express=require("express")
// const {createUser}=require("../controller/userController")
const {createUser, getUsers}=require("../../controller/User/userController")


const router=express.Router()

router.get("/",getUsers)
router.post("/signup",createUser)


module.exports=router