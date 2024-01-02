const Task=require("../../model/taskModel")
const { response200, response500, response201, response202 } = require("../../lib/api/response-messages")

const addTask=async(req,res)=>{
    try {
        const {title,description,due_date,status}=req.body
        const user_id=req.user?.user_id
        const task = new Task({
            user_id,
            title,
            description,
            due_date,
            status,
            createdAt: Date.now(),
          });
         const isTaskSaved=await task.save() 
        return response200(res,"Task added successfully",true,task)     
    } catch (error) {
        console.log("error",error)
        return response500(res)
    }
}
const updateTask=async(req,res)=>{
    try {
        const {title,description,due_date,status}=req.body
        const task_id=req.params?.task_id
        if(task_id){
            const isUpdated=await Task.updateOne({_id:task_id},{title,description,due_date,status})
            const isTaskUpdated= await Task.findOne({_id:task_id})
            return response200(res,"Task updated successfully",true,isTaskUpdated)     
        }else{

            return response201(res,"Task id is missing",true,null)     
        }
    } catch (error) {
        console.log("error",error)
        return response500(res)
    }
}

const deleteTask=async(req,res)=>{
    try {
        const task_id=req.params?.task_id
        if(task_id){
            const isTaskDeleted=await Task.deleteOne({_id:task_id})
            return response200(res,"Task deleted successfully",true,{task_id})
        }else{
            return response202(res, "Task id is missing",false,null)
        }
    } catch (error) {
        return response500(res)
    }
}

const getOneTask=async(req,res)=>{
    try {
        const task_id=req.params?.task_id
        if(task_id){
            const task=await Task.findOne({_id:task_id})
            return response200(res,"Task fetched successfully",true,task)

        }else{
            return response202(res, "Task id is missing",false,null)
        }
    } catch (error) {
        return response500(res)
    }
}

const getAllUserCreatedTask=async(req,res)=>{
    try {
        const user_id=req.user?.user_id
        if(user_id){
            const tasks=await Task.find({user_id})
            return response200(res,"Tasks fetched successfully",true,tasks)
        }else{
            return response202(res, "User id is missing",false,null)
        }
    } catch (error) {
        return response500(res)
    }
}

module.exports={
    addTask,
    updateTask,
    deleteTask,
    getOneTask,
    getAllUserCreatedTask
}