import express from 'express';
const router = express.Router();
import * as userController from '../controllers/user.js';
import authMiddleware from '../middlewares/authMiddleware.js';

router.post('/registration', userController.registration);
router.post('/login', userController.userLogin);
router.get('/details',authMiddleware, userController.getUserDetails);

export default router;