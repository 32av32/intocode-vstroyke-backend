const multer = require('multer');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images/pictures');
    },
    filename: function (req, file, cb) {
        req.imageName ? req.imageName = [...req.imageName] : req.imageName = []
        const fileName = `${Date.now()}_${file.originalname}`
        req.imageName.push(fileName)
        cb(null, fileName);
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