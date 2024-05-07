import { appError } from "../utils/appError.js"



export function validation(Schema) {
    return (req,res,next)=>{
        let { error } = Schema.validate(req.body,{abortEarly: false })
        if (!error) {
            next()
        } else {
            next(new appError(error , 406))
        }
    }
    
}