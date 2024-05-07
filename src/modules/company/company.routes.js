import  express  from "express";
import { auth } from "../../middleware/auth.js";
import { addCompany, deleteCompany, getAllApp, getData, search, updateCompany } from "./company.controller.js";
import { addCompanySchema, updateCompanySchema } from "./company.validator.js";
import { validation } from "../../middleware/validation.js";
const companyRoutes=express.Router()

/*  A D D     C O M P A N Y  */
companyRoutes.post("/add",validation(addCompanySchema),auth,addCompany)

/*  U P D A T E     C O M P A N Y   */ 
companyRoutes.patch("/updateCompany",validation(updateCompanySchema),auth,updateCompany)
/*  D E L E T E      C O M P A N Y   */ 
companyRoutes.delete("/deleteCompany",auth,deleteCompany)
/* G E T    C O M P A N Y   D A T A */
companyRoutes.get("/getData/:companyid",auth,getData)
/* S E A R C H     F O R    A   C O M P A N Y   */
companyRoutes.post("/search",auth,search)
/* G E T   A L L    A P P L I C A T I O N     F O R   J O B */
companyRoutes.post("/getAllApp",auth,getAllApp)




















export default companyRoutes