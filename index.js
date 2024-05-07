import * as dotenv from 'dotenv'
dotenv.config()
import express from "express";
import { connection } from './database/connection.js';
import userRoutes from './src/modules/user/user.routes.js';
import { globalError } from './src/utils/globalErrorHandle.js';
import { appError } from './src/utils/appError.js';
import companyRoutes from './src/modules/company/company.routes.js';
import jobsRoutes from './src/modules/jobs/jobs.routes.js';
import { v2 as cloudinary } from 'cloudinary';





const app = express()
const port = 3000
app.use(express.json())

cloudinary.config({
  cloud_name: 'dm5ckg9dg',
  api_key: '263536166845691',
  api_secret: process.env.api_secret
});



app.use("/api/v1/user", userRoutes)
app.use("/api/v1/company", companyRoutes)
app.use("/api/v1/job", jobsRoutes)


connection()

app.use("*", (req, res, next) => {
  next(new appError(`invalid URL ${req.originalUrl}`, 404))
})

app.use(globalError)


app.listen(port, () => console.log(`app listening on port ${port}!`))
