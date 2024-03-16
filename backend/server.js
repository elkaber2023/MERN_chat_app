import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import path from"path";

import authRoutes from "./Routes/auth.routes.js";
import messageRoutes from "./Routes/message.routes.js";
import userRoutes from "./Routes/user.routes.js";

import connectToMongoDB from "./DB/connectToMongoDB.js";
import {app,server} from"./Socket/socket.js"

app.use(cookieParser());

const PORT = process.env.PORT || 5000;

const __dirname =path.resolve();

dotenv.config();


// Cors
const corsOptions = {
  // origin: "http://localhost:5173",
  // allowedHeaders:['Content-Type', 'Authorization'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  AccessControlAllowOrigin:"*",
  // SupportsCredentials:true,
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);


app.use(express.static(path.join(__dirname,"/frontend/dist")))

app.get("*",(req,res)=>{
  res.sendFile(path.join(__dirname,"frontend","dist","index.html"))
})


server.listen(PORT, () => {
  connectToMongoDB();
  console.log(`SERVER => Server Running On Port ${PORT}`);
});
