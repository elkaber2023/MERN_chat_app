import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import authRoutes from "./Routes/auth.routes.js";
import messageRoutes from "./Routes/message.routes.js";
import userRoutes from "./Routes/user.routes.js";

import connectToMongoDB from "./DB/connectToMongoDB.js";
import {app,server} from"./Socket/socket.js"

app.use(cookieParser());

dotenv.config();
const PORT = process.env.PORT || 5000;

app.use(cors(corsOptions));
var corsOptions = {
  origin: "http://localhost:5173",
  // allowedHeaders:['Content-Type', 'Authorization'],
  // SupportsCredentials:true,
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

// app.get("/", async(req, res) => {
//   // root route http://localhost:8140/
//   // res.send("<h1>Hello Osama Welcome To Back :)</h1>");

//   const headers = new Headers();
//   res.setHeader("jwt", "sssssssssssssssssss")
 
//   // Cookies that have not been signed
//   console.log("Cookies: ", req.cookies.jwt);

//   // Cookies that have been signed
//   console.log("Signed Cookies: ", req.signedCookies);
// });


server.listen(PORT, () => {
  connectToMongoDB();
  console.log(`SERVER => Server Running On Port ${PORT}`);
});
