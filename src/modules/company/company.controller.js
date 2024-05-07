import { applicationModel } from "../../../database/models/application.model.js";
import { CompanyModel } from "../../../database/models/company.model.js";
import { JobModel } from "../../../database/models/job.model.js";
import { userModel } from "../../../database/models/user.model.js";
import { handleAsynError } from "../../middleware/handleAsyncError.js";
import { appError } from "../../utils/appError.js";

/*  A D D     C O M P A N Y  */
export const addCompany = handleAsynError(async (req, res, next) => {
    let { companyName, description, industry, address, minNumberOfEmployees, maxnumberOfEmployees, companyEmail } = req.body
    let foundedUser = await userModel.findById({ _id: req.userId })
    if (foundedUser.role == "Company_HR") {
        let foundedcompany = await CompanyModel.findOne({ companyName })
        if (foundedcompany) return next(new appError(`companyName already exist`, 409))
        let foundedcompanyEmail = await CompanyModel.findOne({ companyEmail })
        if (foundedcompanyEmail) return res.json({ message: 'companyEmail already exist' })
        let addedcompany = await CompanyModel.insertMany({ companyName, description, industry, address, numberOfEmployees: minNumberOfEmployees + "-" + maxnumberOfEmployees, companyEmail, companyHR: req.userId })
        res.status(201).json({ message: "Done ", addedcompany })
    } else {
        next(new appError("u can't added", 400))
    }
})

/*  U P D A T E     C O M P A N Y   */
export const updateCompany = handleAsynError(async (req, res, next) => {
    let foundedUser = await userModel.findById({ _id: req.userId })
    if (foundedUser.role == "Company_HR") {
        let { companyid, companyName, address, companyEmail } = req.body
        let foundedcompany = await CompanyModel.findById({ _id: companyid })
        if (foundedcompany.companyHR == req.userId) {
            let updatedCompany = await CompanyModel.updateOne({ _id: companyid }, { companyName, address, companyEmail }, { new: true })
            res.status(200).json({ message: "Done ", updatedCompany })
        } else {
            next(new appError("u can't updated (not owner)", 400))
        }
    } else {
        next(new appError("your role can't updated", 400))
    }
})
/*  D E L E T E      C O M P A N Y   */
export const deleteCompany = handleAsynError(async (req, res, next) => {
    let foundedUser = await userModel.findById({ _id: req.userId })
    if (foundedUser.role == "Company_HR") {
        let { companyid } = req.body
        let foundedcompany = await CompanyModel.findById({ _id: companyid })
        if (foundedcompany.companyHR == req.userId) {
            let deletedCompany = await CompanyModel.deleteOne({ _id: companyid })
            res.status(200).json({ message: "Done ", deletedCompany })
        } else {
            next(new appError("u can't deleted (not owner)", 400))
        }
    } else {
        next(new appError("your role can't deleted", 400))
    }
})


/* G E T    C O M P A N Y   D A T A    D A T A     J O B S     */
export const getData = handleAsynError(async (req, res, next) => {
    let { companyid } = req.params
    let foundedUser = await userModel.findById({ _id: req.userId })
    if (foundedUser.role == "Company_HR") {
        let foundedJobsCompany = await JobModel.find({ addedBy: companyid })
        res.status(200).json({ message: "Done ", foundedJobsCompany })

    } else {
        next(new appError("your role can't getData", 400))
    }
})

/* S E A R C H     F O R    A   C O M P A N Y   */
export const search = handleAsynError(async (req, res, next) => {
    let { companyName } = req.body
    let foundedUser = await userModel.findById({ _id: req.userId })
    if (foundedUser.role == "Company_HR" || foundedUser.role == "user") {
        let foundedcompany = await CompanyModel.find({ companyName })
        res.status(200).json({ message: "Done ", foundedcompany })

    } else {
        next(new appError("your role can't Search", 400))
    }
})
/* G E T   A L L    A P P L I C A T I O N     F O R   J O B */
export const getAllApp = handleAsynError(async (req, res, next) => {
    let { jobTitle, companyid } = req.body
    let foundedUser = await userModel.findById({ _id: req.userId })
    if (foundedUser.role == "Company_HR") {
        let foundedcompany = await CompanyModel.find({ companyHR: req.userId })
        let jobs = await JobModel.find({ $and: [{ jobTitle }, { addedBy: foundedcompany[0]._id }] })
        let applicationcompany = await applicationModel.find({ company: foundedcompany[0]._id }).populate({ path: "user", select: '-_id' })
        res.status(200).json({ message: "Done ", applicationcompany, foundedcompany, jobs })

    } else {
        next(new appError("your role can't getData", 400))
    }
})



