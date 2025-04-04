import { uploadOnCloudinary } from "../utils/cloudinary.js"
import Cow from "../models/cow.model.js";
import User from "../models/user.model.js";


const sellCow = async (req, res) => {
try {

    const {Breed, Age, CalvinCount, MilkCapacity, Address, Price, longitude= 0 , latitude= 0} = req.body;

    if([Breed, Age, CalvinCount, MilkCapacity, Address, Price,].some(field => !field?.trim())){
        return res.status(400).json({message: "All Field Are Required"});
    }

        const Image1_Local = req.files?.CowImage1[0]?.path;
        const Image2_Local = req.files?.CowImage2[0]?.path;

        if(!Image1_Local || !Image2_Local) return res.status(400).json({message:"Please Upload All Images"});

        const image1 = await uploadOnCloudinary(Image1_Local);
        const image2 = await uploadOnCloudinary(Image2_Local);

        if(!image1 || !image2) return res.status(400).json({message:"Images Are Required"})

        const cow = await Cow.create({
            Breed,
            Age,
            CalvinCount,
            MilkCapacity,
            Address,
            Price,
            Owner: req.user._id,
            CowImage1: image1.url,
            CowImage2: image2.url,
            location:{
                type:"Point",
                coordinates: [longitude,latitude]
            }
        })

        if(!cow) return res.status(500).json({message:"Failed To Create Post For Cow"});

        await User.findByIdAndUpdate(req.user._id,
            {$push: {posts: cow._id}},
            {new: true}
        );

        return res.status(200).json({message:"Cow Posted SuccessFully",data:cow})
} catch (error) {
    console.error("Internal Error While Posting Cow");
}
}

export { sellCow } 