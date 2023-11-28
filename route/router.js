const express = require("express")
const { signup, signin, getuser, logout } = require("../controller/authController")
const jwtAuth = require("../middleWare/middleware")

const authrouter = express.Router()


authrouter.post("/signup" ,signup )

authrouter.post('/signin' , signin)


authrouter.get('/getuser' ,jwtAuth, getuser)

authrouter.get("/logout" ,  logout)









module.exports=authrouter