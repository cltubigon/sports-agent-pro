import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import usersRoute from "./routes/users.js"
import hotelsRoute from "./routes/hotels.js"
import roomsRoute from "./routes/rooms.js"
import authRoute from "./routes/auth.js"
import cookieParser from "cookie-parser"
import cors from "cors"

const app = express()
dotenv.config()

const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true, // to enable cookies to be sent to/from the server
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(cors(corsOptions))

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO, {dbName: 'sports_agent_pro'})
    console.log("connected to mongoDB")
  } catch (error) {
    throw error
  }
}

mongoose.connection.on("disconnected", () => {
  console.log("mongoDB disconnected")
})
mongoose.connection.on("connected", () => {
  console.log("mongoDB connected")
})

//middlewares
app.use(cookieParser())
app.use(express.json())

app.use("/api/users", usersRoute)
app.use("/api/hotels", hotelsRoute)
app.use("/api/rooms", roomsRoute)
app.use("/api/auth", authRoute)

app.use((err, req, res, next)=>{
  const errorStatus = err.status || 500
  const errorMessage = err.message || "Something went wrong!"
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  })
})

app.listen(8000, async () => {
  connect()
  console.log("Connected to backend on port 8000")
})