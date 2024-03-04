import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";


import authRoutes from "./Routes/auth.routes.js";
import messageRoutes from "./Routes/message.routes.js";
import userRoutes from"./Routes/user.routes.js"

import connectToMongoDB from "./DB/connectToMongoDB.js";


const app = express();

dotenv.config();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

// app.get("/", (req, res) => {
//   // root route http://localhost:8140/
//   res.send("<h1>Hello Osama Welcome To Back :)</h1>");
// });

app.listen(PORT, () => {
  connectToMongoDB();
  console.log(`SERVER => Server Running On Port ${PORT}`);
});
