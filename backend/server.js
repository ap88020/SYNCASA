import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import connectDB from './src/config/mongodb.js';
import userRouter from './src/routes/user.routes.js'

const app = express();
const port = process.env.PORT || 3000;

// middleware
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use('/user',userRouter)

app.get('/',(req,res) => {
    res.send("api is working");
})

app.listen(port,() => {
    console.log(`App is listening at port : ${port}`)
    connectDB()
})
