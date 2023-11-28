const userModel = require("../model/dataModel.js");
const emailValidaor = require("email-validator");
const bcrypt = require("bcrypt");




const signup = async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;
  if (!name || !email || !password || !confirmPassword) {
    return res.status(400).json({
      success: false,
      message: "Every field is required",
    });
  }

  const validEmail = emailValidaor.validate(email);
  if (!validEmail) {
    return res.status(400).json({
      success: false,
      message: "Enter valid Email id",
    });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({
      success: false,
      message: "password and confirmPassword doens't matched ",
    });
  }

  try {
    const user = await userModel(req.body);
    const result = await user.save();
    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    if (error.code === 11000) {
      res.status("400").json({
        success: false,
        message: "email is all ready exist",
      });
    }
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};






const signin = async (req, res) => {
  try {
      const {email , password}=req.body
      if(!email || !password){
        res.status(400).json({
          success:false,
          message:"check email id and password"
        })
      }

    
      const users = await userModel.findOne({
        email
      }).select("+password")

      if(!users || !(await bcrypt.compare(password , users.password))){
        res.status(400).json({
          success:true,
          message:"check email id and password"
        })
      }

      const result =users.jwtToken()
      users.password=undefined

      cookieOption={
        maxAge : 24* 60 * 60 * 1000,
        httpOnly:true
      }
      res.cookie("token" ,result , cookieOption)
      res.status(200).json({
        success:true,
        data:users
      })
     } catch (error) {
      res.status(400).json({
        success:false,
        message:error.message
      })
     }

};









const getuser = async (req, res) => {
const main = req.user.id

try {
  const user = await userModel.findById(main)
  return res.status(200).json({
    success:true,
    data:user
  })
} catch (error) {
  return res.status(400).json({
    success:false,
    message:error.message
  })

}
};



const logout = (req, res) => {
  try {
    const cookieOption = {
      expires: new Date(),
      httpOnly: true,
    };
    res.cookie("token", null, cookieOption);
    res.status(200).json({
      success: true,
      message: "Logged Out",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};




module.exports = {
  signup,
  signin,
  getuser,
  logout,
};
