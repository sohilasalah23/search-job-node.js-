 export const globalError = (err,req,res,next)=>{
    process.env.MODE =="dev" ?  res.status(err.statusCode?err.statusCode:500).json({msg:"helooo",err:err.message , stack:err.stack}) : res.status(err.statusCode?err.statusCode:500).json({err:err.message})

}