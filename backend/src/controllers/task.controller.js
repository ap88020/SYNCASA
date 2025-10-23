import House from "../models/house.model.js";
import User from "../models/user.model.js";
import Task from "../models/task.model.js";

const taskControllers = {
  createTask: async (req, res) => {
    try {
      const { houseId } = req.params;
      const userId = req.user._id;
      const { title, description, assignedTo, categories,priority } = req.body;

      if(!title || !assignedTo){
        return res.json({
          status:false,
          message:"Title and assigned fields are required"
        })
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
      )

      if(!isMember){
        return res.json({ 
          success:false,
          message:"Assigned member are not member of this group"
        })
      }

      const newTask = await Task.create({
        title,
        description,
        house:houseId,
        assignedBy:userId,
        assignedTo,
        priority: priority || "medium",
        date:Date.now(),
        categories : categories || []
      })

      res.json({
        success: true,
        message: "Task created successfully",
        data:newTask
      });

    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, message: "Server error" });
    }
  },
};

export default taskControllers;
