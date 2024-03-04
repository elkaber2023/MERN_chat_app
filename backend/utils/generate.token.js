import jwt from "jsonwebtoken";

const generateTokenAndCookie = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "15d",
  });

  res.cookie("jwt", token, {
    maxAge: 15 * 24 * 60 * 60 * 1000, //15 day
    httpOnly: true,
    sameSite: "strict",
    secure:process.env.MODE_ENV !=="development"
  });
};

export default generateTokenAndCookie;