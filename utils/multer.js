import multer from 'multer';
import path from 'path';

export default multer({
    storage: multer.diskStorage({}),
    fileFilter: (req, file, cb) => {
        console.log('hi');
        let ext = path.extname(file.originalname);
        if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png" && ext !== ".PNG") {
            cb(new Error('File type not supported'), false);
            return;
        }
        cb(null, true);
    },
});

