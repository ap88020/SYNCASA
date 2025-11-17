import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isConnected: false,
  socketId: null,
  socketInstance: null,
  activeHouse: null,
  typingUsers: [],
  onlineUsers: [],
  error: null,
};

const socketSlice = createSlice({
  name: 'socket',
  initialState,
  reducers: {
    socketConnected: (state, action) => {
      state.isConnected = true;
      state.socketId = action.payload;
      state.error = null;
    },
    
    socketDisconnected: (state) => {
      state.isConnected = false;
      state.socketId = null;
      state.socketInstance = null;
      state.activeHouse = null;
      state.typingUsers = [];
      state.onlineUsers = [];
    },
    
    setSocketInstance: (state, action) => {  
      state.socketInstance = action.payload;
    },
    
    joinHouseRoom: (state, action) => {
      state.activeHouse = action.payload;
    },
    
    leaveHouseRoom: (state) => {
      state.activeHouse = null;
      state.typingUsers = [];
      state.onlineUsers = [];
    },
    
    userStartedTyping: (state, action) => {
      const { userId, userName } = action.payload;
      const existingUser = state.typingUsers.find(user => user.userId === userId);
      
      if (!existingUser) {
        state.typingUsers.push({ userId, userName, isTyping: true });
      }
    },
    
    userStoppedTyping: (state, action) => {
      const { userId } = action.payload;
      state.typingUsers = state.typingUsers.filter(user => user.userId !== userId);
    },
    
    socketError: (state, action) => {
      state.error = action.payload;
    },
    
    clearSocketError: (state) => {
      state.error = null;
    },
    
    disconnectSocket: (state) => {
      if (state.socketInstance) {
        state.socketInstance.disconnect();
      }
      state.isConnected = false;
      state.socketId = null;
      state.socketInstance = null;
      state.activeHouse = null;
      state.typingUsers = [];
      state.onlineUsers = [];
    }
  }
});

// ✅ Make sure ALL actions are exported, including setSocketInstance
export const {
  socketConnected,
  socketDisconnected,
  setSocketInstance,  // This must be included
  joinHouseRoom,
  leaveHouseRoom,
  userStartedTyping,
  userStoppedTyping,
  socketError,
  clearSocketError,
  disconnectSocket,
} = socketSlice.actions;

export default socketSlice.reducer;