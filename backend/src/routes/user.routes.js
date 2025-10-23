import express from 'express'
import userControllers from '../controllers/user.controller.js';
import authUser from '../middleware/authUser.middleware.js';
// import { upload  } from '../middleware/multer.js';

const router = express.Router();

router.post('/register',userControllers.register);
router.post('/login',userControllers.login);
router.get('/profile',authUser,userControllers.getProfile);
export default router;