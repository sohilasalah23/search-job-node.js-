import mongoose from "mongoose";
export const connection =()=>{
    mongoose.connect(process.env.CONNECTIONURL)
    .then(() => console.log(' DB Connected!'))
    .catch((err)=>console.log('err',err))
   
}