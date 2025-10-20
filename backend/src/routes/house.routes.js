import express from 'express'
import authUser from '../middleware/authUser.middleware.js'
import houseController from '../controllers/house.controller.js';

const router = express.Router();

router.post('/house/create',authUser,houseController.createHouse);
router.get('/house/userHouse',authUser,houseController.getUserHouse);
router.get('/house/:id',authUser,houseController.getHouseById);
router.post('/house/joinhouse/',authUser,houseController.joinHouse);

export default router;