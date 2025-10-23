import express from "express";
import User from "../models/user.model.js";
import generateToken from "../config/generateToken.js";
import { decodePassword, hashPassword } from "../config/passwordHashing.js";
import { v2 as cloudinary } from "cloudinary";

const userControllers = {
  register: async (req, res) => {
    try {
      const { name, email, password } = req.body;

      if (!name || !email || !password) {
        return res.status(400).json({
          success: false,
          message: "All fields are ( name, email , password ) required",
        });
      }

      const existsUser = await User.findOne({ email });

      if (existsUser) {
        return res.status(400).json({
          success: false,
          message: "User already exists for this email",
        });
      }

      const hash = await hashPassword(password);

      const user = await User.create({
        name,
        email,
        password: hash,
      });

      const token = generateToken(user._id);

      // ✅ RETURN USER DATA in consistent format
      const userResponse = {
        id: user._id,
        name: user.name,
        email: user.email,
      };

      res.status(201).json({
        success: true,
        message: "User registered successfully",
        token: token,
        user: userResponse, // ✅ Add user data
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false, // ✅ Fix: should be false on error
        message: error.message,
      });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({
          success: false,
          message: "Email or Password required",
        });
      }

      const user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({
          success: false,
          message: "Invalid email or password",
        });
      }

      const isMatch = await decodePassword(password, user.password);

      if (!isMatch) {
        return res.status(400).json({
          success: false,
          message: "Invalid email or password",
        });
      }

      const token = generateToken(user._id);

      // ✅ RETURN USER DATA in consistent format
      const userResponse = {
        id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
      };

      res.status(200).json({
        success: true,
        message: "Logged In successfully",
        token: token,
        user: userResponse, // ✅ Add user data
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
      console.log(error);
    }
  },

  getProfile: async (req, res) => {
    try {
      // ✅ FIX: Use req.user._id (from auth middleware) instead of req.user.id
      const user = await User.findById(req.user._id).select("-password");

      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      // ✅ RETURN consistent format
      const userResponse = {
        id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
      };

      res.status(200).json({
        success: true,
        user: userResponse, // ✅ Return as "user" not "message"
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },
};

export default userControllers;
