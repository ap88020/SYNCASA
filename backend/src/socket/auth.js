import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const socketAuth = async (socket, next) => {
  try {
        const token = socket.handshake.auth.token;

        if (!token) {
        return next(new Error("Authentication error : No Token Provided"));
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id).select("password");

        if (!user) {
        return next(new Error("Authentication error : User not found"));
        }

        socket.userId = decoded.id;
        socket.user = user;

        next();
  } catch (error) {
    next(new Error("Authentication errro : Invalid token"));
  }
};
