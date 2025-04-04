import mongoose, { Schema } from "mongoose";

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
    location: {
        type: {
          type: String,
          default: "Point"
        },
        coordinates: {
          type: [Number], // [longitude, latitude]
        }
      }

},{timestamps: true})

cowSchema.index({ location: "2dsphere" });

const Cow = mongoose.model("Cow", cowSchema);

export default Cow;