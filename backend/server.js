import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import connectDB from './src/config/mongodb.js';
import userRouter from './src/routes/user.routes.js';
import houseRouter from './src/routes/house.routes.js';
import taskRouter from './src/routes/task.routes.js';
import http from 'http';
import { Server } from 'socket.io';
import { initializeSocket } from './src/socket/index.js';

const app = express();
const port = process.env.PORT || 3000;

// First : create HTTP server
const server = http.createServer(app);

// Initialize Socket.io
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true
  }
});

// Connect to MongoDB once at startup
await connectDB();

// Middlewares
app.use(express.json());
app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:5173",
  credentials: true,
}));
app.use(express.urlencoded({ extended: true }));

// Initialize socket.io handlers
initializeSocket(io);

// Routes
app.use('/user', userRouter);
app.use('/api', houseRouter);
app.use('/task', taskRouter);

app.get('/', (req, res) => {
  res.send('API is working ✅');
});

app.get('/health', (req, res) => {
  res.json({
    success: true,
    message: "API is working",
    socket: server
  });
});

// For local dev only:
if (process.env.NODE_ENV !== 'production') {
  server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
    console.log(`Socket.IO is ready for connections`);
  });
}

export default server;