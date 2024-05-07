import  express  from "express";
import { auth } from "../../middleware/auth.js";
import { validation } from "../../middleware/validation.js";
import { JobWithCompany, JobsInCompany,filterJob,  addJob, applyToJob, deletejob, updateJob } from "./jobs.controller.js";
import { addJobSchema, updateJobSchema } from "./jobs.validator.js";
import { upload } from "../../middleware/uploadResume.js";
const jobsRoutes=express.Router()
/* A D D        J O B    */
jobsRoutes.post("/addJob",validation(addJobSchema),auth,addJob)
/* U P D A T E       J O B    */
jobsRoutes.patch("/updateJob",validation(updateJobSchema),auth,updateJob)
    /*  D E L E T E       J O B    */
jobsRoutes.delete("/deletejob",auth,deletejob)
/* G E T    A L L    J O B S   W I T H   C O M P A N Y   */
jobsRoutes.get("/JobWithCompany",auth,JobWithCompany)
/* G E T    A L L    J O B S   F O R    S P E C I F I C       C O M P A N Y   */
jobsRoutes.get("/JobsInCompany",auth,JobsInCompany)
/*  F I L T E R     J O B  */
jobsRoutes.post("/filterJob",auth,filterJob)
/* A P P L Y    T O   J O B */
jobsRoutes.post("/applyToJob",auth,upload.single('userResume'),applyToJob)









export default jobsRoutes
