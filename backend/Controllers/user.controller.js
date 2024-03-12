import User from "../Models/user.model.js";

export const getUsersForSidebar = async (req, res) => {
  // console.log("getUsersForSidebar => ",req.headers);
  // return;
  try {
    const loggedInUserId = req.user._id;
// console.log("const getUsersForSidebar : loggedInUserId => ",loggedInUserId);
    const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");

    res.status(200).json(filteredUsers);
  } catch (error) {
    console.log("Error in getUsersForSidebar: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
