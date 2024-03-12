import jwt from "jsonwebtoken";
import User from "../Models/user.model.js";

const protectRoute = async (req, res, next) => {
  // console.log("protectRoute => ",req.headers);
  try {
    const authorization =
      (await req.headers["Authorization"]) || req.headers["authorization"];

    const token = authorization?.split(" ")[1];

    //  console.log("protectRoute =>  res => ",res);
    //  console.log("protectRoute =>  req => ",req);

    if (!token) {
      return res
        .status(401)
        .json({ error: "Unauthorized - No Token Provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return res
        .status(401)
        .json({ error: "verify Unauthorized - No Token Provided" });
    }
    // console.log("decoded => ", decoded);
    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res
        .status(404)
        .json({ error: "Error from> protectRoute => User not found!" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log("Error in protectRoute middleware: ", error.message);
    res.status(500).json("Error internal server");
  }
};

export default protectRoute;
