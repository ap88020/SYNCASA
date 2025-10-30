import express from 'express';
import authUser from '../middleware/authUser.middleware.js';
import taskController from '../controllers/task.controller.js'

const route = express.Router();

route.post("/house/:houseId",authUser,taskController.createTask)
route.get("/data/:houseId",authUser,taskController.getTask);
route.post("/complete/:taskId",authUser,taskController.completeTask);
route.post("/delete/:taskId",authUser,taskController.deleteTask)

export default route;