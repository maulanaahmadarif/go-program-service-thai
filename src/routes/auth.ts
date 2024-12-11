import express from 'express';

const router = express.Router();

import { generateNewToken, logout } from '../controllers/auth';

router.post('/refresh', generateNewToken);
router.post('/logout', logout);

export default router;