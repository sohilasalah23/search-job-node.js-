import Joi from "joi";

/* A D D        J O B    S C H E M A  */
export const addJobSchema = Joi.object({
    companyid: Joi.string().hex().length(24).required(),
    jobTitle: Joi.string().min(2).required(),
    jobLocation: Joi.string().required(),
    workingTime: Joi.string().required(),
    seniorityLevel: Joi.string().required(),
    jobDescription: Joi.string().min(50).required(),
    technicalSkills: Joi.array().required(),
    softSkills: Joi.array().required()

})
/* U P D A T E       J O B   S C H E M A  */
export const updateJobSchema = Joi.object({
    jobid: Joi.string().hex().length(24).required(),
    jobTitle: Joi.string().min(2),
    jobLocation: Joi.string(),
    workingTime: Joi.string(),
    seniorityLevel: Joi.string(),
    jobDescription: Joi.string().min(50),
    technicalSkills: Joi.array(),
    softSkills: Joi.array()
})