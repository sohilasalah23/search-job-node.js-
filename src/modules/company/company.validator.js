import Joi from "joi"


/*  A D D     C O M P A N Y    S C H E M A */
export const addCompanySchema = Joi.object({
    companyName: Joi.string().min(2).required(),
    description: Joi.string().min(50).required(),
    industry: Joi.string().required(),
    address: Joi.string().required(),
    minNumberOfEmployees: Joi.string().required(),
    maxnumberOfEmployees: Joi.string().required(),
    companyEmail: Joi.string().email().required(), 
})
/*  U P D A T E     C O M P A N Y    S C H E M A  */ 
export const updateCompanySchema = Joi.object({
    companyid:Joi.string().hex().length(24).required(),
    companyName: Joi.string().min(2),
    description: Joi.string().min(50),
    address: Joi.string(),
    companyEmail: Joi.string().email(), 
})