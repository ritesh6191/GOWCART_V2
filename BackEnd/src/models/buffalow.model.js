import mongoose, { Schema } from "mongoose";

const buffSchema = new  Schema({
    Breed : String,
    Age : Number,
    CalvinCount  : Number,
    MilkCapacity : Number,
    Address: String,
    Price: Number,
    Owner:{
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    BuffImage1 : String, //Cloudiniry URL
    BuffImage2 : String, //Cloudiniry URL
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

buffSchema.index({ location: "2dsphere" });

const Buffalo = mongoose.model("Buffalo", buffSchema);

export default Buffalo;