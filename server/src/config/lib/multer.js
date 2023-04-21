const multer  = require('multer');
const path  = require('path');
const AVATAR_PATH = 'uploads/avatar/';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, AVATAR_PATH)
    },
    filename: (req, file, cb) => {
        const fileExt = path.extname(file.originalname);
        const fileName = file.originalname
                        .replace(fileExt, '')
                        .toLowerCase()
                        .split(" ")
                        .join("-") + "-" + Date.now();
        cb(null, fileName + fileExt); 
                        
    }
})

const profilePhoto = multer({ 
    storage: storage,
    limits: {
        fileSize: 1000000, // 1MB
    },
    fileFilter: (req, file, callback) => {
        if (
            file.mimetype === "image/png" || 
            file.mimetype === "image/jpg" || 
            file.mimetype === "image/jpeg" 
        ) {
            callback(null, true);
        }else{
            callback(new Error("Only .png, .jpg or .jpeg files are allowed!"));
        }
    } 
});

module.exports.profilePhoto = profilePhoto;