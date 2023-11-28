const mongoose  = require("mongoose")
const bcrypt = require("bcrypt")
const  JWT = require('jsonwebtoken')
// const {Schema} = mongoose()


const userSchema = new mongoose.Schema({
    name:{
        type:String,
        minLenght:[5 , "name must be at least 5 char"],
        maxLength:[20 , "name must be less than 50 char"],
        trim:true
    },
    email:{
        type:String,
        required:[true , "email is required"],
        unique:[true , "this email is all ready exists"],
        lowercase:true,
    },
    password:{
        type:String,
        select:false
    },
},{
    timestamps:true,
}
);


userSchema.pre("save" , async function(next){
    if (!this.isModified('password')) {
        next()
    }
    else{
        this.password =await bcrypt.hash(this.password ,10)
        return next()
    } 
})


userSchema.methods = {
    jwtToken(){
        return JWT.sign(
            {id:this._id , email:this.email},
            process.env.SECRET,
            {expiresIn:'24h'}
        )
    }
  }



const userModel = mongoose.model("user" , userSchema)


module.exports=userModel
