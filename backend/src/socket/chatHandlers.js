import House from '../models/house.model.js';
import ChatMessage from '../models/chat.model.js'; 

export const chatHandler = (socket, io) => {
    
    const joinChatRoom = async (houseId) => {
        try {
            const house = await House.findOne({
                _id: houseId,
                'members.user':socket.userId
            });

            if(house){
                socket.join(houseId);
                console.log(`User ${socket.user.name} joined chat room for house ${houseId}`)
            }else{
                socket.emit('error', 'Not a member of this house');
            }
        } catch (error) {
            console.error(`Error joining chat room : `, error);
            socket.emit('error', 'Failed to join chat room');
        }
    };

    const sendMessages = async (data) => {
        try {
            const { houseId, message } = data;

            
            const house = await House.findOne({
                _id: houseId,
                'members.user': socket.userId
            });

            if (!house) {
                socket.emit('error', 'Not a member of this house');
                return; 
            }

            
            const newMessage = new ChatMessage({
                house: houseId,
                sender: socket.userId,
                message: message,
                readBy: [{
                    user: socket.userId,
                    readAt: new Date()
                }]
            });

            await newMessage.save();
            await newMessage.populate('sender', 'name email avatar');

            
            io.to(houseId).emit('new-message', newMessage);

        } catch (error) {
            console.error('Error sending message:', error);
            socket.emit('error', 'Failed to send message');
        }
    };

    const typingStart = (houseId) => {
        
        socket.to(houseId).emit('user-typing', {
            userId: socket.userId,
            userName: socket.user.name, 
            isTyping: true
        });
    };

    
    const typingStop = (houseId) => {
        
        socket.to(houseId).emit('user-typing', {
            userId: socket.userId,
            userName: socket.user.name, 
            isTyping: false
        });
    };

    const markMessagesRead = async (houseId) => {
        try {
            
            await ChatMessage.updateMany(
                {
                    house: houseId,
                    sender: { $ne: socket.userId },
                    'readBy.user': { $ne: socket.userId }
                },
                {
                    $push: {
                        readBy: {
                            user: socket.userId,
                            readAt: new Date(),
                        }
                    }
                }
            );
        } catch (error) {
            console.error('Error marking messages as read:', error);
        }
    };

    socket.on('join-chat-room', joinChatRoom);
    socket.on('send-message', sendMessages);
    socket.on('typing-start', typingStart);
    socket.on('typing-stop', typingStop);
    socket.on('mark-messages-read', markMessagesRead);
};