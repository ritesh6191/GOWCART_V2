import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


const userSchema = new mongoose.Schema(
  {
    phone: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    refreshToken: { type: String },
    posts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Cow",
      },
    ],
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.isPasswordCorrect = async function (password){
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = function() {
    return jwt.sign(
        {
        _id : this._id,
        phone : this.phone,
        firstName : this.firstName,
        }, 
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn : "1d",
    }
  );
};

userSchema.methods.generateRefreshToken = function() {
  return jwt.sign(
      {
      _id : this._id,

      }, 
  process.env.REFRESH_TOKEN_SECRET,
  {
    expiresIn : "10d",
  }
);
};

const User = mongoose.model("User", userSchema);

export default User;
