import mongoose from "mongoose";

const schema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        minLength:[2 , "firstName is too short"],
        trim:true
    },
    lastName:{
        type:String,
        required:true,
        minLength:[2 , "lastName is too short"],
        trim:true
    },
    username:{
        type:String,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        minLength:[4,"password is too short"],
        maxLength:[100,"password is too long"],
    },
    recoveryEmail:{
        type:String,
        required:true,
    },
    DOB:{
         type:Date,
         default: Date.now
    },
    mobileNumber:{
        type:String,
        required:true,
        unique:true
    },
    role:{
        type:String,
        enums:["User","Company_HR"],
        default:"User"
    },
    status :{
        type:String,
        enums:["online","offline"] ,
        default:"offline"
    }

},{timestamps:true})




export const userModel = mongoose.model("user",schema)