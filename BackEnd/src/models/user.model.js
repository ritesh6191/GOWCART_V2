import mongoose, { Model, Schema } from "mongoose";

const userSchema = new  mongoose.Schema({
    Phone : String,
    FirstName : String,
    LastName  : String,
    Posts     : [
        {
            type: Schema.Types.ObjectId,
            ref: "cow"
        }
    ],

},{timestamps: true})

const User = mongoose.model("User", userSchema);

export default User;