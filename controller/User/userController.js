
// let profileImgUrl=req.protocol+":"+"//"+req.hostname+":"+process.env.PORT+"/images/"+req.file.filename
const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken")
const User=require("../../model/userModel")
const createUser=async(req,res)=>{

    try {
        const { email, password } = req.body;
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(password, salt)
        const alreadyExist = await User.findOne({ email })
        const user = new User({ email, password: hash })
        console.log("login user",req.body)
        // if (alreadyExist) {
        //     res.status(409)
        //     return res.send("user already Exists");
        // }else{
        //     await user.save()
        //         const token = jwt.sign(
        //             { user_id: user._id, email },
        //             process.env.TOKEN_KEY,
        //             {
        //                 expiresIn: 2000,
        //             }
        //         );
        //         user.token = token
        //         // user.role="Client"
        //         // res.
        //         res.status(200)
        //         return res.send(user)
        // }
        if (alreadyExist && (bcrypt.compareSync(password, alreadyExist.password))) {
            // Create token
            const token = jwt.sign(
                { user_id: alreadyExist._id, email },
                process.env.TOKEN_KEY,
                {
                    expiresIn: "30d",
                }
            );
            alreadyExist["token"] = token;
            // console.log("token",token)
            res.status(200)
            return res.send({alreadyExist,token:token,status:200})

        } else {
            // res.status(401)
            res.send({status:401,message:"Inavalid credentials"})
            return res.status(401)

        }
    } catch (error) {
        console.log("some error", error.message)
    }
}

const getUsers=async(req,res)=>{
    try {
        // Just add testing deployment
        return res.status(200).send("App is running")
    } catch (error) {
        console.error("error:",error)
        return res.status(500)
    }
}

module.exports={
    createUser,
    getUsers,
}