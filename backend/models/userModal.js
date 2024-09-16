import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
name:{
    type:String,
    required:true,
    trim:true
},
email:{
type:String,
required:true,
unique:true,//it is use so that only one user will be added by on email id
},
password:{
    type:String,
    required:true,
    
},
phone:{
    type:String,
    required:true,
},
address:{
    type:String,
    required:true,
},
answer:{
type:String,
required:true
},
role:{
    type:Number,
    default:0, // if it is 0 it is for user if 1 it is for admin
},
},{timestamps:true})// add the created time when ever user is added

export default mongoose.model('users',userSchema)