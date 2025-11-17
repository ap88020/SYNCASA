import { io } from "socket.io-client";
const backend_url = import.meta.env.VITE_BACKEND_URL;

class SocketService {
  socket = null;
  store = null;

  initializeSocket(store) {
    this.store = store;

    const token = localStorage.getItem("token");

    this.socket = io(backend_url || "http://localhost:4000", {
      auth: {
        token: token,
      },
    });

    this.setupEventListeners();
  }

  setupEventListeners() {
    if (!this.socket) return;

    this.socket.on("connect", () => {
      this.store.dispatch({
        type: "socket/socketConnected", 
        payload: this.socket.id,
      });
      console.log("Connected to server with ID:", this.socket.id);
    });

    this.socket.on("disconnect", () => {
      this.store.dispatch({ type: "socket/socketDisconnected" });
      console.log("Disconnected from server");
    });

    this.socket.on("new-message", (message) => {
      console.log("New message received:", message);
    });

    
    this.socket.on("user-typing", (data) => {
      if (data.isTyping) {
        this.store.dispatch({
          type: "socket/userStartedTyping",
          payload: { userId: data.userId, userName: data.userName },
        });
      } else {
        this.store.dispatch({
          type: "socket/userStoppedTyping",
          payload: { userId: data.userId },
        });
      }
    });

    this.socket.on("error", (error) => {
      this.store.dispatch({ type: "socket/socketError", payload: error });
      console.log("Socket error:", error);
    });

    this.socket.on("connect_error", (error) => {
      this.store.dispatch({
        type: "socket/socketError",
        payload: error.message,
      });
    });
  }

  joinChatRoom(houseId) {
    if (this.socket) {
      this.socket.emit("join-chat-room", houseId);
      this.store.dispatch({ type: "socket/joinHouseRoom", payload: houseId });
    }
  }

  sendMessage(data) {
    if(this.socket){
        this.socket.emit('send-message',data);
    }
  }

  startTyping(houseId){
    if(this.socket){
        this.socket.emit('typing-start',houseId);
    }
  }

  stopTyping(houseId){
    if(this.socket){
        this.socket.emit('typing-stop',houseId);
    }
  }

  markMessagesRead(houseId){
    if(this.socket){
        this.socket.emit('mark-messages-read',houseId);
    }
  }

  disconnect(){
    if(this.socket){
        this.socket.disconnect();
        this.socket = null;
    }
  }

  getSocket(){
    return this.socket;
  }
}

export default new SocketService();