import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import connectDB from './src/config/mongoDb.js';

const app = express();
const port = process.env.PORT || 3000;

// middleware
app.use(express.json());
app.use(cors());


app.listen(port,() => {
    console.log(`App is listening at port : ${port}`)
    connectDB()
})
