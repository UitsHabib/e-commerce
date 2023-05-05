const multer  = require('multer');
const path  = require('path');
const AVATAR_PATH = 'uploads/avatar/';
const CATEGORY_IMAGE_PATH = 'uploads/category/';
const SUBCATEGORY_IMAGE_PATH = 'uploads/subcategory-images/'
const PRODUCT_IMAGE_PATH = 'uploads/product-images/'

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
const categoryImageStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, CATEGORY_IMAGE_PATH)
    },
    filename: (req, file, cb) => {
        const fileExt = path.extname(file.originalname);
        const fileName = file.originalname
                        .replace(fileExt, '')
                        .toLowerCase()
                        .split(" ")
                        .join("-") + "-" + Date.now();
        cb(null, fileName + fileExt);
        req.fileName = fileName;
    }
})

const categoryImage = multer({ 
    storage: categoryImageStorage,
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

const subcategoryImageStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, SUBCATEGORY_IMAGE_PATH)
    },
    filename: (req, file, cb) => {
        const fileExt = path.extname(file.originalname);
        const fileName = file.originalname
                        .replace(fileExt, '')
                        .toLowerCase()
                        .split(" ")
                        .join("-") + "-" + Date.now();
        cb(null, fileName + fileExt);
        req.fileName = fileName;
    }
})

const subcategoryImage = multer({ 
    storage: subcategoryImageStorage,
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

    const filenames = [];

    const productstorage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, PRODUCT_IMAGE_PATH)
        },
        filename: (req, file, cb) => {
            const fileExt = path.extname(file.originalname);
            const fileName = file.originalname
                            .replace(fileExt, '')
                            .toLowerCase()
                            .split(" ")
                            .join("-") + "-" + Date.now();
            cb(null, fileName + fileExt);

            filenames.push(fileName);
            req.ImagefileNames = filenames;
        }
    })

const uploadProductImages = multer({ 
    storage: productstorage,
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
module.exports.categoryImage = categoryImage;
module.exports.subcategoryImage = subcategoryImage;
module.exports.uploadProductImages = uploadProductImages;