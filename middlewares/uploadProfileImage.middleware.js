const multer = require('multer');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images/profile');
    },
    filename: function (req, file, cb) {
        req.imageName = `${Date.now()}_${file.originalname}`
        cb(null, req.imageName);
    }
});

const fileFilter = (req, file, cb) => {

    if(file.mimetype === "image/png" ||
        file.mimetype === "image/jpg"||
        file.mimetype === "image/jpeg"){
        cb(null, true);
    }
    else{
        cb(null, false);
    }
}

module.exports = multer({ storage, fileFilter });