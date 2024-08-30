import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import Order from "./order.model.js";

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
    orders: [Order.schema], // this is an array of Order records, and each order record is an array of Products, and a date
  },
  { timestamps: true } // for createdAt and updatedAt fields - client - member since <user.createdAt>
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
