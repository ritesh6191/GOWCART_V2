import mongoose, { Model, Schema } from "mongoose";

const cowSchema = new  Schema({
    Breed : String,
    Age : String,
    CalvinCount  : String,
    MilkCapacity : String,
    Address: String,
    Price: String,
    Owner:{
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    CowImage1 : String, //Cloudiniry URL
    CowImage2 : String, //Cloudiniry URL

},{timestamps: true})

const Cow = mongoose.model("Cow", cowSchema);

export default Cow;