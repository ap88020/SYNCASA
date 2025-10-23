import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true
    },
    description:{
        type:String,
        trim:true
    },
    house:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'House',
        required:true
    },
    assignedTo:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    assignedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    status:{
        type:String,
        enum:['pending','in-progress','completed','cancelled'],
        default:'pending'
    },
    priority:{
        type:String,
        enum:['low','medium','high'],
        default:'medium'
    },
    dueDate:{
        type:Date
    },
    completedAt:{
        type:Date
    },
    categories:[{
        type:String,
        trim:true
    }]
},{
    timestamps:true
})

taskSchema.index({house:1,status:1})
taskSchema.index({assignedTo:1,status:1})
taskSchema.index({dueDate:1})


const taskModel = mongoose.model('Task',taskSchema);

export default taskModel;