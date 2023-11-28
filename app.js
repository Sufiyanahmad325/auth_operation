const express = require("express");
const authrouter = require("./route/router");
const connectedToDB = require("./config/authDB");
const app = express()
const cookieparser =require('cookie-parser')

connectedToDB()

app.use(express.json());
app.use(cookieparser())


app.use("/auth/" ,authrouter)

app.get('/', (req ,res)=>{
    res.send("Hello World")
})



module.exports=app