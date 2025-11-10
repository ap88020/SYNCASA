import House from '../models/house.model.js'
import chatMessage from '../models/chat.model.js';

export const chatHandler = (socket,io)=>{
    const sendMessages = async (data) => {
        try {
            const {houseId,message} = data;

            const house = await house.findOne({
                _id : houseId,
                'members.user': socket.userId
            })

            if(!house){
                socket.emit('error : Not a member of this house')
            }

            const chatMessage = new chatMessage({
                house:houseId,
                sender:socket.userId,
                message:message,
                readBy : [{
                    user : socket.userId,
                    readAt: new Date()
                }]
            })

            await chatMessage.save();
            await chatMessage.populate('sender','name email avatar')

        } catch (error) {
            console.error('error sending message : ', error);
            socket.emit('error', 'Failed to send message'); 
        }

        const typingStart = (houseId) => {
            socket.io(houseId).emit('User-Typing',{
                userId: socket.userId,
                userName : socket.user.name,
                isTyping: true 
            })
        }

        const typingStop = (houseId) => {
            socket.io(houseId).emit('User-Typing',{
                userId : socket.userId,
                userName: socket.userName, 
                isTyping : false
            })
        }

        const markMessagesRead = async (houseId) => {
            try {
                await chatMessage.updateMany(
                    {
                        house:houseId,
                        sender:{$ne : socket.userId},
                        'readBy.user':{$ne : socket.userId}
                    },
                    {
                        $push:{
                            readBy:{
                                user : socket.userId,
                                readAt : new Date(),
                            }
                        }
                    }
                )
            } catch (error) {
                console.error('Error marking messages as read: ', error);
            }
        } 
    }

    socket.on('send-message',sendMessages);
    socket.on('typing-start',typingStart);
    socket.on('typing-stop',typingStop);
    socket.on('mark-messages-read', markMessagesRead);
}