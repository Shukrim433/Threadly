import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    surname: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true, minimize: false } //** // for createdAt and updatedAt fields - client - member since <user.createdAt>
);

userSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// removed correctPw instance method from here, instead used it + bcrypt.compare directly in login controller

const User = mongoose.model("User", userSchema);

export default User;


/* 
By default, Mongoose will "minimize" (or remove) empty objects when they are saved to the database. 
When minimize: false is set, Mongoose will preserve empty objects in the document instead of removing them.
*/