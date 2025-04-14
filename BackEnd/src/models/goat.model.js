import mongoose, { Schema } from "mongoose";

const goatSchema = new  Schema({
    Breed : String,
    Age : Number,
    Weight: Number,
    Address: String,
    Price: Number,
    Owner:{
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    GoatImage1 : String, //Cloudiniry URL
    GoatImage2 : String, //Cloudiniry URL
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

goatSchema.index({ location: "2dsphere" });

const Goat = mongoose.model("Goat", goatSchema);

export default Goat;