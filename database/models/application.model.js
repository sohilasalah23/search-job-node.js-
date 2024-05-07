import mongoose from "mongoose";

const schema = new mongoose.Schema({
    job:{
        type:mongoose.Types.ObjectId,
        ref:"Job",
    },
    user:{
        type:mongoose.Types.ObjectId,
        ref:"user",
    },
    company:{
        type:mongoose.Types.ObjectId,
        ref:"Company"
    },
    userTechSkills:{
        type:[String],
        required:true,
    },
    userSoftSkills:{
        type:[String],
        required:true,
    },
    userResume:{
        type:String,
        required:true,
        tirm:true
    },
    ResumeId:{
        type:String,
        required:true,
        unique:true
    }
},{timestamps:true})




export const applicationModel = mongoose.model("application",schema)