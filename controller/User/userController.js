// let profileImgUrl=req.protocol+":"+"//"+req.hostname+":"+process.env.PORT+"/images/"+req.file.filename
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../model/userModel");
const {
  response200,
  response403,
  response202,
  response500,
} = require("../../lib/api/response-messages");

const createUser = async (req, res) => {
  try {
    const { first_name, last_name, email, password } = req.body;
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(password, salt);
    const alreadyExist = await User.findOne({ email });
    const user = new User({
      first_name,
      last_name,
      email,
      password: hash,
      createdAt: Date.now(),
    });
    // const alreadyExist=false
    // console.log("login user",req.body)
    if (alreadyExist) {
      return response202(res, "This Email is already registered", false, null);
    } else {
      const isUserSaved = await user.save();
      const token = await jwt.sign(
        { user_id: user._id, email: user.email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "30d",
        }
      );
      user["token"] = token;
      return response200(res, "User is created", true, user);
    }
  } catch (error) {
    console.log("some error", error.message);
    return response403(res);
  }
};
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const alreadyExist = await User.findOne({ email });
    // console.log("login user",req.body)
    if (alreadyExist && bcrypt.compareSync(password, alreadyExist.password)) {
      // Create token
      const token = jwt.sign(
        { user_id: alreadyExist._id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "30d",
        }
      );
      alreadyExist.token = token;
      return response200(res, "User login successfully", true, alreadyExist);
    } else {
      return response202(res, "This email is not registered", false, null);
    }
  } catch (error) {
    // console.log("some error", error.message)
    return response500(res, error.message);
  }
};

const getUsers = async (req, res) => {
  try {
    // Just add testing deployment
    return res.status(200).send("App is running");
  } catch (error) {
    console.error("error:", error);
    return res.status(500);
  }
};

module.exports = {
  createUser,
  getUsers,
  login,
};
