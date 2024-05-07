import mongoose from "mongoose";

const schema = new mongoose.Schema({
    companyName: {
        type: String,
        required: true,
        minLength: [2, "companyName is too short"],
        unique: true
    },
    description: {
        type: String,
        required: true,
        minLength: [50, "description is too short"]
    },
    industry: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true
    },
    numberOfEmployees: {
        type: String,
        required: true,
    },
    companyEmail: {
        type: String,
        required: true,
        unique: true
    },
    companyHR: {
        type: mongoose.Types.ObjectId,
        ref: "user",
    },

}, { timestamps: true })




export const CompanyModel = mongoose.model("Company", schema)