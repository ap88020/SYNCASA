import mongoose from "mongoose";

const connectDB = async () => {
    mongoose.connection.on('connected',() => {
        console.log(`DB Connectedd : ${mongoose.connection.name}`);
    })

    await mongoose.connect(`${process.env.MONGO_URI}/syncasa`);
}

export default connectDB;