import { socketAuth } from "./auth.js";
import { chatHandler } from "./chatHandlers.js";

export const initializeSocket = (io) => {
    io.use(socketAuth);

    io.on('connection',(socket) => {
        console.log(`User ${socket.user.name} connected`);

        // initilize chat hndlers
        chatHandler(socket,io);

        socket.on('disconnect',()=>{
            console.log(`User ${socket.user.name} disconnect`);
        });

        socket.on('error',(error) => {
            console.error(`Socket error for user ${socket.user.name} : `, error);
        });
    })
};