import bcrypt from "bcrypt"
import Jwt from "jsonwebtoken"
import { userModel } from "../../../database/models/user.model.js";
import { handleAsynError } from "../../middleware/handleAsyncError.js";
import { appError } from "../../utils/appError.js"



/* S I G N      U P      */

export const signUp = handleAsynError(async (req, res, next) => {
    let { firstName, lastName, email, password, repassword, recoveryEmail, DOB, mobileNumber, role } = req.body
    let foundeduser = await userModel.findOne({ email })
    if (foundeduser) return next(new appError(`email already exist`, 409))
    let foundedPhoneUser = await userModel.findOne({ mobileNumber })
    if (foundedPhoneUser) return res.json({ message: 'phone already exist' })
    let hashPassword = bcrypt.hashSync(password, parseInt(process.env.SALTROUNDES))
    let addeduser = await userModel.insertMany({ firstName, lastName, username: req.body.firstName + " " + req.body.lastName, email, password: hashPassword, repassword, recoveryEmail, DOB, mobileNumber, role })
    res.status(201).json({ message: "Done ", addeduser })
})
/* S I G N      I N  */
export const signIn = handleAsynError(async (req, res, next) => {
    let { email, mobileNumber, password } = req.body
    let foundeduser = await userModel.findOne({ $or: [{ email }, { mobileNumber }] })
    if (!foundeduser) return next(new appError("u have to register first", 404))
    let matched = bcrypt.compareSync(password, foundeduser.password)
    if (matched) {
        let token = Jwt.sign({ id: foundeduser._id }, process.env.SECRET_KEY)
        let updatedUser = await userModel.findByIdAndUpdate({ _id: foundeduser._id }, { status: "online" }, { new: true })
        res.status(200).json({ message: "welcome", updatedUser, token })
    } else {
        next(new appError("wrong password", 400))
    }
})

/* U P D A T E    U S E R */
export const updateUser = handleAsynError(async (req, res, next) => {
    let { email, mobileNumber, recoveryEmail, DOB, lastName, firstName } = req.body
    let selecteduser = await userModel.findById({ _id: req.userId })
    if (!selecteduser) return next(new appError("u have to register first", 404))
    if (selecteduser.status == "offline") return next(new appError("u have to login first", 404))
    if (req.body.email && req.body.email != selecteduser.email) {
        let foundeduser = await userModel.findOne({ email })
        if (foundeduser) return next(new appError(`email already exist`, 409))
    }
    if (req.body.mobileNumber && req.body.mobileNumber != selecteduser.mobileNumber) {
        let foundedPhoneUser = await userModel.findOne({ mobileNumber })
        if (foundedPhoneUser) return next(new appError(`phone already exist`, 409))
    }
    let updatedUser = await userModel.updateOne({ _id: req.userId }, { email, mobileNumber, recoveryEmail, DOB, lastName, firstName }, { new: true })
    res.status(200).json({ message: "Done ", updatedUser })
}
)
/*  D E L E T E      U S E R   */
export const deleteUser = handleAsynError(async (req, res, next) => {
    let selecteduser = await userModel.findById({ _id: req.userId })
    if (selecteduser.status == "offline") return next(new appError("u have to login first", 404))
    const deletedUser = await userModel.deleteOne({ _id: req.userId })
    if (deletedUser.deletedCount) {
        res.json({ message: "Done ", deletedUser })
    } else {
        res.json({ message: "already deleted " })
    }
})

/* G E T        U S E R     A C C O U N T      D A T A  */
export const userData = handleAsynError(async (req, res, next) => {
    let selecteduser = await userModel.findById({ _id: req.userId })
    if (selecteduser.status == "offline") return next(new appError("u have to login first", 404))
    res.json({ message: "Done ", selecteduser })
})
/* G E T     D A T A           F O R        A N O T H E R       U S E R       */
export const anotherUser = handleAsynError(async (req, res, next) => {
    let { userId } = req.params
    let selecteduser = await userModel.findById({ _id: userId })
    res.json({ message: "Done ", selecteduser })

})

/* U P D A T E   P A S S W O R D   */
export const updatePassword = handleAsynError(async (req, res, next) => {
    let { currentpassword, newPassword } = req.body
    let foundedUser = await userModel.findOne({ _id: req.userId })
    let matched = bcrypt.compareSync(currentpassword, foundedUser.password)
    if (matched) {
        let hashpassword = bcrypt.hashSync(newPassword, parseInt(process.env.SALTROUNDES))
        let updatedUser = await userModel.updateOne({ _id: req.userId }, { password: hashpassword }, { new: true })
        res.status(200).json({ message: "Done ", foundedUser, updatedUser })
    } else {
        next(new appError("wrong password", 400))
    }
}

)

/* G E T      A L L       A C C O U N T S        B Y          R E C O V E R Y E M A I L    */
export const allByRecoveryEmail = handleAsynError(async (req, res, next) => {
    let { recoveryEmail } = req.body
    let foundedUsers = await userModel.find({ recoveryEmail })
    res.json({ message: "Done ", foundedUsers })

})