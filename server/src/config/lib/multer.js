const multer  = require('multer');
const path  = require('path');
const AVATAR_PATH = 'uploads/avatar/';
const CATEGORY_IMAGE_PATH = 'uploads/category/';
const PRODUCT_IMAGE_PATH = 'uploads/product/'

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

const productImageStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, PRODUCT_IMAGE_PATH);
  },
  filename: (req, file, cb) => {
    const fileExt = path.extname(file.originalname);
    const fileName = file.originalname
      .replace(fileExt, '')
      .toLowerCase()
      .split(' ')
      .join('-') + '-' + Date.now();
    cb(null, fileName + fileExt);
  },
});

const productImages = multer({
  storage: productImageStorage,
  limits: {
    fileSize: 1000000, // 1MB
  },
  fileFilter: (req, file, callback) => {
    if (
      file.mimetype === 'image/png' ||
      file.mimetype === 'image/jpg' ||
      file.mimetype === 'image/jpeg'
    ) {
      callback(null, true);
    } else {
      callback(new Error('Only .png, .jpg or .jpeg files are allowed!'));
    }
  },
}).array('images', 5);


module.exports.profilePhoto = profilePhoto;
module.exports.categoryImage = categoryImage;
module.exports.productImages = productImages;