
import Joi from "joi"
/* S I G N      U P        S C H E M A  */
export const signUpSchema = Joi.object({
    firstName: Joi.string().min(3).max(10).required(),
    lastName: Joi.string().min(3).max(10).required(),
    email: Joi.string().email({tlds:{allow:["com","net"]}}).required(),
    password: Joi.string().pattern(/^[A-Z][a-z]{3,9}$/).required(),
    repassword: Joi.string().required().valid(Joi.ref('password')),
    recoveryEmail: Joi.string().email().required(),
    DOB: Joi.date().required(),
    mobileNumber: Joi.string().min(11).max(11).required(),
    role: Joi.string().required()
})

/* S I G N     I N       S C H E M A  */
export const signInSchema = Joi.object({
    email: Joi.string().email(),
    mobileNumber: Joi.string().min(11).max(11),
    password: Joi.string().pattern(/^[A-Z][a-z]{3,9}$/).required(),
})
/* U P D A T E    U S E R      S C H E M A  */

export const updateUserSchema = Joi.object({
    firstName: Joi.string().min(3).max(10),
    lastName: Joi.string().min(3).max(10),
    email: Joi.string().email({tlds:{allow:["com","net"]}}),
    recoveryEmail: Joi.string().email(),
    DOB: Joi.date(),
    mobileNumber: Joi.string().min(11).max(11)
})
/* U P D A T E       P A S S W O R D        S C H E M A  */
 
export const updatePasswordSchema = Joi.object({
    currentpassword:Joi.string().pattern(/^[A-Z][a-z]{3,9}$/).required(),
    newPassword:Joi.string().pattern(/^[A-Z][a-z]{3,9}$/).required()
})