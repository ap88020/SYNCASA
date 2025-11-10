import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import connectDB from './src/config/mongodb.js';
import userRouter from './src/routes/user.routes.js';
import houseRouter from './src/routes/house.routes.js';
import taskRouter from './src/routes/task.routes.js';

const app = express();
const port = process.env.PORT || 3000;

// 🧩 Connect to MongoDB once at startup
await connectDB();

// 🧩 Middlewares
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

// 🧩 Routes
app.use('/user', userRouter);
app.use('/api', houseRouter);
app.use('/task', taskRouter);

app.get('/', (req, res) => {
  res.send('API is working ✅');
});

// For local dev only:
if (process.env.NODE_ENV !== 'production') {
  app.listen(port, () => console.log(`Server running at http://localhost:${port}`));
}

// For Vercel:
export default app;
