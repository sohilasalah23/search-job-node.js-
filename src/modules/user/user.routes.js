import express from "express";
import { allByRecoveryEmail, anotherUser, deleteUser, signIn, signUp, updatePassword, updateUser, userData } from "./user.controller.js";
import { signInSchema, signUpSchema, updatePasswordSchema, updateUserSchema } from "./user.validator.js";
import { validation } from "../../middleware/validation.js";
import { auth } from "../../middleware/auth.js";



const userRoutes = express.Router()


/* S I G N      U P      */
userRoutes.post("/signUp", validation(signUpSchema), signUp)
/* S I G N      I N  */
userRoutes.post("/signIn", validation(signInSchema), signIn)
/* U P D A T E    U S E R */
userRoutes.patch("/update", validation(updateUserSchema), auth, updateUser)
/*  D E L E T E      U S E R   */
userRoutes.delete("/Delete", auth, deleteUser)
/* G E T        U S E R     A C C O U N T      D A T A  */
userRoutes.get("/userData", auth, userData)
/* G E T     D A T A           F O R        A N O T H E R       U S E R       */
userRoutes.get("/anotherUser/:userId", auth, anotherUser)
/* U P D A T E   P A S S W O R D   */
userRoutes.patch("/updatePassword", validation(updatePasswordSchema), auth, updatePassword)
/* G E T      A L L       A C C O U N T S        B Y          R E C O V E R Y E M A I L    */
userRoutes.post("/allByRecoveryEmail", auth, allByRecoveryEmail)






export default userRoutes