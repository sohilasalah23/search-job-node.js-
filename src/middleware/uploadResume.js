import multer from "multer"
import { appError } from "../utils/appError.js"

const storage = multer.diskStorage({})
function fileFilter (req, file, cb) {
    if (file.mimetype.startsWith( 'application/pdf')) {
    cb(null, true)
        
    } else {
    cb(new appError("pdf only",401), false)
        
    }

  }


export const upload = multer({storage,fileFilter })
   