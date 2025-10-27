import House from "../models/house.model.js";
import User from "../models/user.model.js";
import Task from "../models/task.model.js";

const taskControllers = {
    createTask: async (req, res) => {
    try {
      const { houseId } = req.params;
      const userId = req.user._id;
      const { title, description, assignedTo, categories, priority } = req.body;

      if (!title || !assignedTo) {
        return res.json({
          status: false,
          message: "Title and assigned fields are required",
        });
      }

      const houseExist = await House.findById(houseId);

      if (!houseExist) {
        return res.json({
          success: false,
          message: "House not found",
        });
      }

      const isAdmin = houseExist.createdBy.toString() === userId.toString();

      if (!isAdmin) {
        return res.json({
          success: false,
          message: "Only the house admin can assign tasks",
        });
      }

      const isMember = houseExist.members.some(
        (member) => member.user.toString() == assignedTo.toString()
      );

      if (!isMember) {
        return res.json({
          success: false,
          message: "Assigned member are not member of this group",
        });
      }

      const newTask = await Task.create({
        title,
        description,
        house: houseId,
        assignedBy: userId,
        assignedTo,
        priority: priority || "medium",
        date: Date.now(),
        categories: categories || [],
      });

      res.json({
        success: true,
        message: "Task created successfully",
        data: newTask,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, message: "Server error" });
    }
    },
    getTask: async (req, res) => {
      try {
        const { houseId } = req.params;
        const userId = req.user._id;

        const house = await House.findById(houseId);

        if (!houseId) {
          return res.json({
            success: false,
            message: "houseId required",
          });
        }

        const isMember = house.members.some(
          member => member.user.toString() == userId.toString()
        ) || house.createdBy.toString() == userId.toString();

        if(!isMember){
          return res.json({
            success:false,
            message:"member does not exit"
          })
        }

        const tasks = await Task.find({house:house._id}).populate('assignedTo', 'name email');

        res.json({
          success:true,
          data:tasks
        })
        
      } catch (error) {
        console.log(error);
        res.json({
          success:false,
          message:error.message
        })
      }
    },
    completeTask: async (req,res) => {
      try {
        const { taskId } = req.params;
        const userId = req.user._id;

        const task = await Task.findById(taskId);
        if(!task){
          return res.json({
            success:false,
            message:"Task not found"
          })
        }

        if(task.assignedTo.toString() !== userId.toString()){
          return res.json({
            success:false,
            message:"You are not assigned to this task"
          })
        }

        
        task.status = task.status === "pending" ? "completed" : "pending";
        await task.save();

        return res.json({
          success:true,
          message:"task mark as completed",
          data:task
        })

      } catch (error) {
        console.log(error)
        res.json({
          success:true,
          message:error.message
        })
      }      
    }
};

export default taskControllers;