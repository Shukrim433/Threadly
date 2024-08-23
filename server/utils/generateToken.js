import jwt from "jsonwebtoken";

// userId (is the payload for the jwt) passed from signup controller or login controller
// res is passed from signup controller or login controller
const generateTokenAndSetCookie = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "15d",
  });

  res.cookie("jwt", token, {
    maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days in miliseconds
    httpOnly: true, // prevents XSS attacks aka "cross-site scripting attacks"**
    sameSite: "strict", // CSRF attacks aka cross-site request forgery attacks
    secure: process.env.NODE_ENV !== "development", // while in development secure = false, production secure = true
  });
};

//** so this cookie is not accessible to other people via javascript */

export default generateTokenAndSetCookie;
