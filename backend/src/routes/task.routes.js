import express from 'express';
import authUser from '../middleware/authUser.middleware.js';
import taskController from '../controllers/task.controller.js'

const route = express.Router();

route.post("/house/:houseId",authUser,taskController.createTask)

export default route;