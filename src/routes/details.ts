import express from 'express';

// import authenticate from '../middleware/auth';
import { getProgramDetail, getUserProfile, getProjectList, getAllDataDownload } from '../controllers/details';
import authenticate from '../middleware/auth';

const router = express.Router();

router.get('/program', authenticate, getProgramDetail);
router.get('/user/:userId', authenticate, getUserProfile);
router.get('/project/:userId', authenticate, getProjectList);
router.get('/download', authenticate, getAllDataDownload);

export default router;