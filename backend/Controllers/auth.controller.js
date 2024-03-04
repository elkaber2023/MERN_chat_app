import bcrypt from "bcryptjs";
import User from "../Models/user.model.js";
import generateTokenAndCookie from "../utils/generate.token.js";

//*******************************************************/
//Signup
//*******************************************************/

export const signup = async (req, res) => {
  try {
    const { fullName, username, password, confirmPassword, gender } = req.body;

    if (password !== confirmPassword) {
      res.status(400).json({ error: "Passwords don't matches!" });
      return;
    }

    const user = await User.findOne({ username });

    if (user) {
      return res.status(400).json({ error: "Username already exists!" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=[${username}]`;
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=[${username}]`;

    const newUser = new User({
      fullName,
      username,
      password: hashedPassword,
      gender,
      profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
    });

    if (newUser) {
      generateTokenAndCookie(newUser._id, res);
      await newUser.save();

      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        username: newUser.username,
        profilePic: newUser.profilePic,
        gender,
      });
    } else {
      return res.status(400).json({ error: "Invalid user data!" });
    }
  } catch (error) {
    console.log("Catch Error in signup controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//*******************************************************/
//Login
//*******************************************************/
export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    console.log("user",user);
    const isPasswordCorrect = await bcrypt.compare(
      password,
      user.password || ""
      );
      
      console.log("isPasswordCorrect",isPasswordCorrect);
      console.log(username,password);
      
      if (!user) {
        return res.status(400).json({ error: "Invalid Username !" });
      } 
      if (!isPasswordCorrect) {
        return res.status(400).json({ error: "Invalid Password!" });
      }
      
    generateTokenAndCookie(user._id, res);

    res.status(201).json({
      _id: user._id,
      fullName: user.fullName,
      username: user.username,
      profilePic: user.profilePic,
    });
  } catch (error) {
    console.log("Catch Error in login controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//*******************************************************/
//Logout
//*******************************************************/
export const logout = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    return res.status(200).json({ message: "Logged out Successfully" });
  } catch (error) {
    console.log("Catch Error in logout controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
