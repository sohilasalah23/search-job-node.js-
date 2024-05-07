import mongoose from "mongoose";

const schema = new mongoose.Schema({
    jobTitle :{
        type:String,
        required:true,
        trim:true
    },
    jobLocation:{
        type:String,
        required:true,
        enums:["onsite","remotely","hybrid"],
        default:"onsite"
    },
    workingTime:{
        type:String,
        required:true,
        enums:["part-time","full-time"]  ,
        default:"full-time"
    },
    seniorityLevel:{
        type:String,
        required:true,
        enums:["Junior","Mid-Level","Senior","Team-Lead","CTO"]  ,
        default:"Junior"
    },
    jobDescription:{
        type:String,
        required:true,
        minLength:[50 , " jobDescription is too short"],
        trim:true
    },
    technicalSkills :{
        type:[String],
        required:true,
        trim:true
    },
    softSkills :{
        type:[String],
        required:true,
        trim:true
    },
    addedBy:{
     type:mongoose.Types.ObjectId,
     ref:"Company",
     required:true,

    }

},{timestamps:true})




export const JobModel = mongoose.model("Job",schema)