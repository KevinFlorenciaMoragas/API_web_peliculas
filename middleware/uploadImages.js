const path = require('path');
const multer = require('multer');
const SharpMulter = require('sharp-multer');

const newFilenameFunction = (og_filename, options) => {
    const date = new Date();
    const dateNow = date.getTime();
    const newName =
        og_filename.split('.').slice(0, -1).join('.') +
        dateNow + '.' + options.fileFormat;
    return newName;
}

const storage = SharpMulter({
    destination: (req, file, callback) => callback(null, './public/images'),
    imageOptions: {
        fileFormat: 'webp',
        quality: 100,
        resize: {
            width: 1920,
            height: 1080
        }
    },
    filename: newFilenameFunction
})
const upload = multer({ storage });

module.exports = upload.single('url');