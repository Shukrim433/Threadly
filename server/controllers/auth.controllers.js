import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import generateTokenAndSetCookie from "../utils/generateToken.js";

export const signup = async (req, res) => {
  try {
    // the info user types in to signup in form
    const { firstName, surname, username, password, confirmPassword } =
      req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({ error: "passwords dont match" });
    }

    const user = await User.findOne({ username });

    if (user) {
      return res.status(400).json({ error: "username already exists" });
    }

    const userData = new User({
      firstName: firstName,
      surname: surname,
      username: username,
      password: password,
    });

    // if user is successfully created
    if (userData) {
      // GENERATE JWT token here
      generateTokenAndSetCookie(userData._id, res);
      await userData.save();
      res.status(201).json(userData); //- this is the same as below** except below does not return the password field // 201 = successfully created
    } else {
      res.status(400).json({ error: "invalid user data" });
    }
  } catch (error) {
    console.log("error in signup controller", error.message);
    res.status(500).json({ error: "internal server error" });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const userData = await User.findOne({ username });
    const correctPw = await bcrypt.compare(password, userData?.password || "");

    if (!userData || !correctPw) {
      res.status(400).json({ error: "invalid username or password" }); // this message for security reasons, so accounts cant get hacked
    }

    generateTokenAndSetCookie(userData._id, res);

    res.status(200).json(userData);
  } catch (error) {
    console.log("error in login controller", error.message);
    res.status(500).json({ error: "internal server error" });
  }
};

export const logout = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "logged out successfully" });
  } catch (error) {
    console.log("error in logout controller", error.message);
    res.status(500).json({ error: "internal server error" });
  }
};

/*   **res.status(201).json({
      _id: userData._id,
      firstName: userData.firstName,
      surname: userData.surname,
      username: userData.username,
      });
*/
