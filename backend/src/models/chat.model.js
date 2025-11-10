import mongoose from "mongoose";

const chatMessageSchema = new mongoose.Schema(
  {
    house: {
      type: mongoose.Schema.ObjectId,
      ref: "House",
      required: true,
      index: true,
    },
    sender: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
    message: {
      type: String,
      required: true,
      trim: true,
      maxlength: 1000,
    },
    readBy: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        readAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  {
    timeStamps: true,
  }
);

chatMessageSchema.index({ house: 1, createdAt: -1 });
chatMessageSchema.index({ sender: 1, createdAt: -1 });

const chatMessage = mongoose.model("chat", chatMessageSchema);

export default chatMessage;