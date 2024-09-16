import express from "express"
import colors from "colors"
import dotenv from "dotenv"
import morgan  from "morgan"
import connectDB from "./config/db.js"
import authRoute from "./routes/authRoute.js"
import categoryRoute from "./routes/categoryRoute.js"
import productRoute from './routes/productRoute.js'
import cors from "cors"
// import authRoutes from "./sroutes/authRoute.js"

// const express = require("express") //this is when we donot use tpe : module


dotenv.config()

//configure env

//database config
connectDB()

//rest object
const app = express()

//middleware
app.use(express.json())
app.use(cors())
app.use(morgan('dev'))


//routes
// app.subscribe('/api/v1/auth',authRoutes)
app.use('/api/v1/auth',authRoute)
app.use('/api/v1/category',categoryRoute)
app.use('/api/v1/product',productRoute)


//rest api
// app.get('/',(req,res)=>{
// // res.send(
// //     '<h1>Welcome to ecommerce app</h1>'
// // )
// })

//Port
const PORT = process.env.PORT || 8080; //in this we are saying that if the .env port not work than use 8080 port but it is not recommended

//run port 

app.listen(PORT,()=>{
    console.log(`server running on ${process.env.DEV_MODE} mode on port ${PORT}`.bgCyan.white)
})

