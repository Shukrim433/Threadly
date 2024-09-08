import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const protectRoute = async (req, res, next) => {
  try {
    // retrieve the jwt token from the cookies (only exists/is created if a user has signed up or logged in) ie when u test login/signup routes in postman there's re.body and req.cookies section
    const token = req.cookies.jwt;

    // if theres no jwt token in the cookies, that means user is not logged/signed in
    if (!token) {
      return res
        .status(401)
        .json({ error: "unauthorized - not token provided" });
    }

    // if jwt token does exist in cookies, then .verify() it using the jwt token and its password
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // if the jwt token id not verified, that means its invalid(or smth idk)
    if (!decoded) {
      return res.status(401).json({ error: "unauthorized - invalid token" });
    }

    // else if tokin is verified then find the currently logged in user's obj in the db using the _id saved in the decoded jwt token object (called userId & not _id because thats what we called it when we signed the token, check utils folder)
    const authenticatedPerson = await User.findById(decoded.userId).select("-password");

    // if that _id cannot be found in the db, that means the user doesnt exist
    if (!authenticatedPerson) {
      return res.status(401).json({ error: "user not found" });
    }

    // if _id is found in the db, add the key "user" to the request object and its value="authenticatedPerson"
    req.user = authenticatedPerson;

    next(); 
  } catch (error) {
    console.log("error in protectRoute middleware", error.message);
    res.status(500).json({ error: "internal server error" });
  }
};

export default protectRoute;

// CONTINUE BACKEND PRODUCT ROUTES AND MODELS ETC VID => 1:17:00
