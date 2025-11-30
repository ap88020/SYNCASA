// import React, { useEffect, useState, useRef } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useParams } from 'react-router-dom';
// import { initializeChatSocket, sendChatMessage, fetchChatMessages } from '../feature/chat/chatThunks';
// import { disconnectSocket } from '../feature/socket/socketSlice';

// const GroupChat = () => {
//   const { houseId } = useParams();
//   const dispatch = useDispatch();
//   const [newMessage, setNewMessage] = useState('');
//   const messagesEndRef = useRef(null);
  
//   // Add safe selectors with default values
//   const { messages = [], loading } = useSelector(state => state.chat || {});
//   const { isConnected = false, socketInstance = null, typingUsers = [] } = useSelector(state => state.socket || {});
//   const { user } = useSelector(state => state.auth || {});

//   console.log('Chat State:', { messages, isConnected, socketInstance, user }); // Debug log

//   useEffect(() => {
//     if (houseId && user) {
//       console.log('Initializing socket for house:', houseId);
//       dispatch(initializeChatSocket(houseId));
//       dispatch(fetchChatMessages(houseId)); // Fetch message history
//     }

//     return () => {
//       console.log('Cleaning up socket');
//       dispatch(disconnectSocket());
//     };
//   }, [houseId, user, dispatch]);

//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//   }, [messages]);

//   const handleSendMessage = (e) => {
//     e.preventDefault();
//     if (newMessage.trim() && isConnected) {
//       console.log('Sending message:', newMessage);
//       dispatch(sendChatMessage({ houseId, message: newMessage }));
//       setNewMessage('');
//     }
//   };

//   const handleTypingStart = () => {
//     if (socketInstance && isConnected) {
//       socketInstance.emit('typing-start', houseId);
//     }
//   };

//   const handleTypingStop = () => {
//     if (socketInstance && isConnected) {
//       socketInstance.emit('typing-stop', houseId);
//     }
//   };

//   // Safe message rendering
//   const renderMessages = () => {
//     if (!messages || !Array.isArray(messages)) {
//       return <p className="text-center text-gray-500">No messages yet</p>;
//     }

//     return messages.map((message) => {
//       // Safe property access
//       const senderId = message.sender?._id;
//       const senderName = message.sender?.name || 'Unknown';
//       const isOwnMessage = senderId === user?._id;

//       return (
//         <div
//           key={message._id || Math.random()}
//           className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'} mb-4`}
//         >
//           <div
//             className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
//               isOwnMessage
//                 ? 'bg-blue-500 text-white'
//                 : 'bg-gray-200 text-gray-800'
//             }`}
//           >
//             <p className="text-sm">{message.message}</p>
//             <p className="text-xs opacity-75 mt-1">
//               {isOwnMessage ? 'You' : senderName} • {new Date(message.createdAt).toLocaleTimeString()}
//             </p>
//           </div>
//         </div>
//       );
//     });
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 p-4">
//       <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg">
//         {/* Chat Header */}
//         <div className="p-4 border-b">
//           <h1 className="text-2xl font-bold">Household Chat</h1>
//           <div className="flex items-center gap-2 mt-2">
//             <div className={`w-3 h-3 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
//             <span className="text-sm text-gray-600">
//               {isConnected ? 'Connected' : 'Disconnected'}
//             </span>
//             {loading && <span className="text-sm text-blue-500">Loading...</span>}
//           </div>
//         </div>

//         {/* Messages Container */}
//         <div className="h-96 overflow-y-auto p-4">
//           {renderMessages()}
          
//           {/* Typing Indicators */}
//           {typingUsers.map((typingUser) => (
//             <div key={typingUser.userId} className="flex justify-start mb-2">
//               <div className="bg-gray-200 px-4 py-2 rounded-lg">
//                 <p className="text-sm text-gray-600 italic">
//                   {typingUser.userName} is typing...
//                 </p>
//               </div>
//             </div>
//           ))}
          
//           <div ref={messagesEndRef} />
//         </div>

//         {/* Message Input */}
//         <form onSubmit={handleSendMessage} className="p-4 border-t">
//           <div className="flex gap-2">
//             <input
//               type="text"
//               value={newMessage}
//               onChange={(e) => setNewMessage(e.target.value)}
//               onFocus={handleTypingStart}
//               onBlur={handleTypingStop}
//               placeholder={isConnected ? "Type your message..." : "Connecting..."}
//               className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               disabled={!isConnected}
//             />
//             <button
//               type="submit"
//               disabled={!isConnected || !newMessage.trim()}
//               className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
//             >
//               Send
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default GroupChat;

import React from "react";
import {FileText} from 'lucide-react'

const GroupChat = () => {
  return (
    <div className="h-screen flex flex-col p-6 space-y-6 dark:bg-primary-dark">
      <h1 className="text-slate-500 dark:text-white text-2xl">Group Chat</h1>
      <div className="flex flex-col items-center space-y-2 shadow shadow-gray-600 dark:shadow dark:shadow-gray-200 text-white p-6 rounded-lg">
        < FileText className="text-gray-600 w-32 h-24 font-bold"/>
        <p className="dark:text-blue-100 text-gray-600">
          Group chat Coming Soon
        </p>
        <div className="text-slate-600 font-semibold dark:text-white">Track Shared expenses , split bills, and manage payments with your house hold members.</div>
      </div>
    </div>
  );
};

export default GroupChat;
