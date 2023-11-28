const mongoose = require("mongoose")


const MONGODB_URL=process.env.MONGODB_URL || 3010


const connectedToDB = async ()=>{
    mongoose.
    connect(MONGODB_URL)
    .then((conn)=>{
        console.log(`connected to DB:${conn.connection.host}`)
    }).catch((err)=> console.log(err.message))
}


module.exports=connectedToDB