import React from "react";
import { MessageCircle } from "lucide-react";

const GroupChat = () => {
  return (
    <div className="h-screen flex flex-col p-6 space-y-6 dark:bg-primary-dark">
      <h1 className="text-slate-500 dark:text-white text-2xl">Group Chat</h1>
      <div className="flex flex-col items-center space-y-2 shadow shadow-gray-600 dark:shadow dark:shadow-gray-200 text-white p-6 rounded-lg">
        <MessageCircle className="text-gray-600 w-32 h-24 font-bold" />
        <p className="dark:text-blue-100 text-gray-600">Chat Feature Coming Soon</p>
        <div className="text-slate-600 font-semibold dark:text-white">
          Communicate with your hosehold members in real time about task, bills
          and events.
        </div>
      </div>
    </div>
  );
};

export default GroupChat;
