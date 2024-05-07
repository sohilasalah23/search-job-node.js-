import  Jwt  from "jsonwebtoken";

export const auth = (req,res,next)=>{
    let token = req.header("token")
    Jwt.verify(token,process.env.SECRET_KEY,(err,decoded)=>{
        if (err) return  res.json({message:"invalid token or didn't provided",err})
        req.userId = decoded.id
        next()
    })
}