import mongoose from "mongoose";

const houseSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    description:{
        type:String,
        trim:true
    },
    address:{
        type:String,
        trim:true
    },
    joinCode:{
        type:String,
        required:true,
        unique:true,
        uppercase:true,
        minLength:6,
        maxLength:6
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    members:[{
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User',
            required:true
        },
        role:{
            type:String,
            enum:['admin','member'],
            default:'member'
        },
        joinedAt:{
            type:Date,
            default:Date.now
        }
    }]
},{
    timestamps:true
})


houseSchema.pre('save', async function(next){
    if(!this.isNew) return next();

    const generateJoinCode = () => {
        Math.random().toString(36).substring(2,8).toUpperCase();
    } 

    let joinCode = generateJoinCode();
    let exists = true;
    
    while(exists){
        const house = await mongoose.model('House').findOne({joinCode});
        if(!house){
            exists = false;
        }else{
            joinCode = generateJoinCode();
        }
    }

    this.joinCode = joinCode;
    next();

})

const houseModel = mongoose.model('House',houseSchema);

export default houseModel