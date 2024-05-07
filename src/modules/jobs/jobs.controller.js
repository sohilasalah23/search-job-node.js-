
import { applicationModel } from "../../../database/models/application.model.js";
import { CompanyModel } from "../../../database/models/company.model.js";
import { JobModel } from "../../../database/models/job.model.js";
import { userModel } from "../../../database/models/user.model.js";
import { handleAsynError } from "../../middleware/handleAsyncError.js";
import { appError } from "../../utils/appError.js";
import {v2 as cloudinary} from 'cloudinary';


/* A D D        J O B    */
export const addJob = handleAsynError(async (req, res, next) => {
    let { companyid, jobTitle, jobLocation, workingTime, seniorityLevel, jobDescription, technicalSkills, softSkills } = req.body
    let foundedUser = await userModel.findById({ _id: req.userId })
    if (foundedUser.role == "Company_HR") {
        let addedJob = await JobModel.insertMany({ jobTitle, jobLocation, workingTime, seniorityLevel, jobDescription, technicalSkills, softSkills, addedBy: companyid })
        res.status(201).json({ message: "Done ", addedJob })
    } else {
        next(new appError("u can't added", 400))
    }
})
/* U P D A T E       J O B    */
export const updateJob = handleAsynError(async (req, res, next) => {
    let { jobid, jobTitle, jobLocation, workingTime, seniorityLevel, jobDescription, technicalSkills, softSkills } = req.body
    let foundedUser = await userModel.findById({ _id: req.userId })
    if (foundedUser.role == "Company_HR") {
        let updatedCompany = await JobModel.updateOne({ _id: jobid }, { jobTitle, jobLocation, workingTime, seniorityLevel, jobDescription, technicalSkills, softSkills }, { new: true })
        res.status(200).json({ message: "Done ", updatedCompany })
    } else {
        next(new appError("your role can't updated", 400))
    }
})


/*  D E L E T E       J O B    */

export const deletejob = handleAsynError(async (req, res, next) => {
    let { jobid } = req.body
    let foundedUser = await userModel.findById({ _id: req.userId })
    if (foundedUser.role == "Company_HR") {
        let deleteJob = await JobModel.deleteOne({ _id: jobid }, { new: true })
        res.status(200).json({ message: "Done ", deleteJob })
    } else {
        next(new appError("your role can't delete", 400))
    }
})


/* G E T    A L L    J O B S   W I T H   C O M P A N Y   */
export const JobWithCompany = handleAsynError(async(req,res,next)=>{
    let foundedUser = await userModel.findById({ _id: req.userId })
if (foundedUser.role=="Company_HR"||foundedUser.role=="user") {
let allJobWithCompany = await JobModel.find().populate("addedBy")
res.status(200).json({ message: "Done ",  allJobWithCompany})
}else {
    next(new appError("your role can't deleted",400))
}
})
/* G E T    A L L    J O B S   F O R    S P E C I F I C       C O M P A N Y   */
export const JobsInCompany = handleAsynError(async(req,res,next)=>{
    let {companyName}=req.query
    let foundedUser = await userModel.findById({ _id: req.userId })
if (foundedUser.role=="Company_HR"||foundedUser.role=="user") {
let Companyid = await CompanyModel.find({companyName}).select("_id")
let allJobWithCompany = await JobModel.find({addedBy:Companyid})
res.status(200).json({ message: "Done ", allJobWithCompany })
}else {
    next(new appError("your role can't deleted",400))
}
})
/*  F I L T E R     J O B  */
export const filterJob = handleAsynError(async(req,res,next)=>{
    let { jobTitle, jobLocation, workingTime, seniorityLevel ,technicalSkills} = req.body
    let filter = []
    let foundedUser = await userModel.findById({ _id: req.userId })
    if (foundedUser.role=="Company_HR"||foundedUser.role=="user") {
        if (jobTitle) {filter.push({jobTitle})}
        if (jobLocation) {filter.push({jobLocation})}
        if (workingTime) {filter.push({workingTime})}
        if (seniorityLevel) {filter.push({seniorityLevel})}
        if (technicalSkills) {filter.push({technicalSkills})}
        if (filter.length>0) {
                for (let i = 0; i < filter.length; i++) {
                let allJobWithCompany = await JobModel.find(filter[i])
                res.status(200).json({ message: "Done ", allJobWithCompany })
                }
        }else{
            next(new appError("you  should applied one at lest"))
        }   
    }else {
        next(new appError("your role can't filter",400))
    }
})


/* A P P L Y    T O   J O B */

export const applyToJob = handleAsynError(async(req,res,next)=>{
    let{job,company,userTechSkills,userSoftSkills}=req.body
    let foundedUser = await userModel.findById({ _id: req.userId })
if (foundedUser.role=="user") {
    cloudinary.uploader.upload( req.file.path,
  async function(error, result) {
    let addedapp = await applicationModel.insertMany({job,user:req.userId,company,userTechSkills,userSoftSkills,userResume:result.secure_url,ResumeId:result.public_id})
  res.status(201).json({ message: "Done ", addedapp }) });
}else {
    next(new appError("your role can't added",400))
}
})
