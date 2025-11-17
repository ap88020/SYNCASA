import { createAsyncThunk } from '@reduxjs/toolkit';
import { io } from 'socket.io-client';
import { 
  setSocketInstance, 
  socketConnected, 
  socketDisconnected, 
  userStartedTyping, 
  userStoppedTyping, 
  socketError 
} from '../socket/socketSlice';
import { addMessage } from './chatSlice';

export const initializeChatSocket = createAsyncThunk(
  'chat/initializeSocket',
  async (houseId, { dispatch, getState }) => {
    try {
      const token = localStorage.getItem('token');
      console.log('Socket initialization started:', { houseId, hasToken: !!token });

      if (!token) {
        throw new Error('No token found in localStorage');
      }

      const { user } = getState().auth;
      if (!user) {
        throw new Error('User not found in auth state');
      }

      // Use your actual backend URL
      const SOCKET_URL = process.env.REACT_APP_API_URL || 'http://localhost:4000';
      console.log('Connecting to:', SOCKET_URL);

      const socket = io(SOCKET_URL, {
        auth: { 
          token: token 
        },
        transports: ['websocket', 'polling']
      });

      // Connection events
      socket.on('connect', () => {
        console.log('✅ Socket connected with ID:', socket.id);
        dispatch(socketConnected(socket.id));
        dispatch(setSocketInstance(socket));
        socket.emit('join-chat-room', houseId);
        console.log('📨 Joined room:', houseId);
      });

      socket.on('disconnect', (reason) => {
        console.log('❌ Socket disconnected:', reason);
        dispatch(socketDisconnected());
      });

      socket.on('connect_error', (error) => {
        console.log('🔴 Connection error:', error.message);
        dispatch(socketError(error.message));
      });

      // Chat events
      socket.on('new-message', (message) => {
        console.log('📩 New message received:', message);
        dispatch(addMessage(message));
      });

      socket.on('user-typing', (data) => {
        console.log('⌨️ Typing event:', data);
        if (data.isTyping) {
          dispatch(userStartedTyping({ userId: data.userId, userName: data.userName }));
        } else {
          dispatch(userStoppedTyping({ userId: data.userId }));
        }
      });

      socket.on('error', (error) => {
        console.log('🚨 Socket error:', error);
        dispatch(socketError(error));
      });

      return socket;

    } catch (error) {
      console.error('🔥 Socket initialization failed:', error);
      dispatch(socketError(error.message));
      throw error;
    }
  }
);

// ✅ ADD THESE MISSING EXPORTS:

// Thunk to send message
export const sendChatMessage = createAsyncThunk(
  'chat/sendMessage',
  async ({ houseId, message }, { getState }) => {
    const { socket } = getState();
    
    if (socket.socketInstance && socket.isConnected) {
      socket.socketInstance.emit('send-message', { houseId, message });
    } else {
      throw new Error('Socket not connected');
    }
  }
);

// Thunk to fetch chat history (REST API)
export const fetchChatMessages = createAsyncThunk(
  'chat/fetchMessages',
  async (houseId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:4000/api/chat/${houseId}/messages`, {
        headers: {
          'token': token
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch messages');
      }

      const data = await response.json();
      return data.messages || [];
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);