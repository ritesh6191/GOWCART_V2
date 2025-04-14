import mongoose, { Schema } from "mongoose";

const horseSchema = new  Schema({
    Breed : String,
    Age : Number,
    Weight: Number,
    Height: Number,
    Health: String,
    Address: String,
    Price: Number,
    Description: String,
    Owner:{
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    HorseImage1 : String, //Cloudiniry URL
    HorseImage2 : String, //Cloudiniry URL
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

horseSchema.index({ location: "2dsphere" });

const Horse = mongoose.model("Horse", horseSchema);

export default Horse;