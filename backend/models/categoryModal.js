import mongoose from 'mongoose'
// const mongoose = require("mongoose")

const categorySchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true,
    },
    slug:{
        type: String,
        required: true, // Ensure that the `required` option is a boolean
        unique: true,
        trim: true
    }
})

export default mongoose.model("category",categorySchema)
