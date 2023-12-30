const jwt = require("jsonwebtoken");
// const User = require("../model/user")
const config = process.env;

const isUserAuthenticated =  async (req, res, next) => {
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const decoded = jwt.verify(token, config.TOKEN_KEY);
    req.user = decoded;
    // console.log("decoded",req.user)
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }

  // let token
  // if(req.headers.authorization || req.headers.authorization.startsWith('Bearer')){
  //   debugger
  //     try {
  //         //get token from header
  //         token=req.headers.authorization.split(' ')[1]

  //         //verify token
  //         const decoded=jwt.verify(token,process.env.JWT_SECRET)

  //         req.user=await User.findById(decoded.id)

  //         next()
          
  //     } catch (error) {
  //       debugger
  //         console.log(error.message)
  //         res.status(401)
  //         throw new Error("Not Authorize")
  //     }
  // }
  // if(!token){
  //     res.status(401)
  //     throw new Error("No Authorize, No Token")
  // }


  return next();
};

module.exports = isUserAuthenticated;