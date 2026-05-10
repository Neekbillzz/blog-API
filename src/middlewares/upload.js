const multer = require('multer');
const cloudinary = require('../config/cloudinary');
const CloudinaryStorage = require('multer-storage-cloudinary').CloudinaryStorage

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'assignment_media',
        allowed_formats: [ 'png', 'jpeg', 'jpg'],
    },
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 3 * 1024 * 1024 }
});

module.exports = upload;