import House from "../models/house.model.js";
import User from "../models/user.model.js";

const houseController = {
  createHouse: async (req, res) => {
    try {
      const { name, description, address } = req.body;
      const userId = req.user._id;

      if (!name || !description || !address) {
        return res.json({
          success: false,
          message: "All fields are rquired (name,description,address)",
        });
      }

      if (!userId) {
        return res.json({
          success: false,
          message: "Login again",
        });
      }

      const house = new House({
        name,
        description,
        address,
        createdBy: userId,
        members: [
          {
            user: userId,
            role: "admin",
          },
        ],
      });

      await house.save();

      await house.populate("createdBy", "name email");
      await house.populate("members.user", "name email");

      res.json({
        success: true,
        message: "House created successfully",
        data: house,
      });
    } catch (error) {
      console.log(error);
      res.json({
        success: false,
        message: error.message,
      });
    }
  },
  getUserHouse: async (req, res) => {
    try {
      const userId = req.user._id;
      if (!userId) {
        return res.json({
          success: false,
          message: "Please login again",
        });
      }

      const houses = await House.find({
        "members.user": userId,
      })
        .populate("createdBy", "name email")
        .populate("members.user", "name , email")
        .sort({ createdAt: -1 });

      res.json({
        success: true,
        data: houses,
      });
    } catch (error) {
      res.json({
        success: false,
        message: "error fetching house",
        error: error.error,
      });
    }
  },
  getHouseById: async (req, res) => {
    try {
      const { id } = req.params;
      const userId = req.user._id;

      // Chain populate directly to the query
      const house = await House.findOne({
        _id: id,
        "members.user": userId,
      })
        .populate("createdBy", "name email")
        .populate("members.user", "name email");

      if (!house) {
        return res.json({
          success: false,
          message: "House not found or access denied",
        });
      }

      res.json({
        success: true,
        data: house,
      });
    } catch (error) {
      console.error(error);
      res.json({
        success: false,
        message: "Error fetching house",
        error: error.message,
      });
    }
  },
  joinHouse: async (req, res) => {
    try {
      const userId = req.user._id;
      const { joinCode } = req.body;

      if (!joinCode) {
        return res.json({
          success: false,
          message: "Join code is required",
        });
      }

      // ✅ Find only by joinCode
      const house = await House.findOne({ joinCode: joinCode.toUpperCase() });

      if (!house) {
        return res.json({
          success: false,
          message: "Invalid join code",
        });
      }

      const isAlreadyMember = house.members.some(
        (member) => member.user.toString() === userId.toString()
      );

      if (isAlreadyMember) {
        return res.json({
          success: false,
          message: "User is already a member of this house",
        });
      }

      house.members.push({ user: userId, role: "member" });
      await house.save();

      const populatedHouse = await House.findById(house._id).populate(
        "members.user",
        "name email"
      );

      res.json({
        success: true,
        message: "You joined successfully",
        data: populatedHouse,
      });
    } catch (error) {
      console.error(error);
      res.json({
        success: false,
        message: "Error adding member",
        error: error.message,
      });
    }
  },
};

export default houseController;