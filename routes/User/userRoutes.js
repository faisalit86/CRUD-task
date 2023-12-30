const express=require("express")
// const {createUser}=require("../controller/userController")
const {createUser, getUsers, login}=require("../../controller/User/userController")
const {ValidateCreateUser}=require("../../controller/User/user.validate")

const router=express.Router()

router.get("/",getUsers)
router.post("/signup",ValidateCreateUser, createUser)
router.post("/login",ValidateCreateUser, login)



module.exports=router