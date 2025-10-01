import { Router } from 'express';
import upload from '../middlewares/multer.js';
import fileController from '../controller/fileController.js';

const router = Router();

router.post('/file/upload', upload.single('file'), fileController.uploadFile);
router.get('/file', fileController.getFile)

export default router;