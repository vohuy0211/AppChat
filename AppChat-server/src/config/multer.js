import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

import cloudinary from '../config/cloundinary.js';

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: (req, file) => {
        let imageFormat = file.originalname.split('.').pop();
        return {
            folder: 'project-book',
            format: imageFormat,
            public_id: `${file.fieldname}-${Date.now()}`,
        };
    },
});

const fileFilter = (req, file, cb) => {
    if (['image/jpeg', 'image/jpg', 'image/png', 'image/gif'].includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type. Only JPEG, JPG, and PNG or GIF are allowed!'), false);
    }
};

const uploadLimits = {
    fileSize: 1 * 1024 * 1024,
};

const multerUpload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: uploadLimits,
});

export { multerUpload };

// export const parseDataConfig = {
//     storage: multer.memoryStorage(),
//     fileFilter: fileFilter,
//     limits: uploadLimits,
// };