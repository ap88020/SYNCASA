import { socketAuth } from "./auth.js";
import { chatHandler } from "./chatHandlers.js";

export const initializeSocket = (io) => {
    io.use(socketAuth);

    io.on('connection',(socket) => {
        console.log()
    })
}