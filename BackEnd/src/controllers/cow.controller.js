import { uploadOnCloudinary } from "../utils/cloudinary.js"
import Cow from "../models/cow.model.js";
import Buffalo from "../models/buffalow.model.js";
import Goat from "../models/goat.model.js";
import Horse from "../models/horse.model.js";
import User from "../models/user.model.js";


const sellCow = async (req, res) => {
try {

    const {Breed, Age, CalvinCount, MilkCapacity, Address, Price, longitude = 0 , latitude = 0 } = req.body;

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
            {
                $push: {
                  posts: {
                    itemId: cow._id,
                    modelType: "Cow",
                  },
                },
              },
            {new: true}
        );

        return res.status(200).json({message:"Cow Posted SuccessFully",data:cow})
} catch (error) {
    console.error("Internal Error While Posting Cow");
}
}

const sellBuffallo = async (req, res) => {
    try {

        const {Breed, Age, CalvinCount, MilkCapacity, Address, Price, longitude = 0 , latitude = 0 } = req.body;
    
        if([Breed, Age, CalvinCount, MilkCapacity, Address, Price,].some(field => !field?.trim())){
            return res.status(400).json({message: "All Field Are Required"});
        }
    
            const Image1_Local = req.files?.BuffImage1[0]?.path;
            const Image2_Local = req.files?.BuffImage2[0]?.path;
    
            if(!Image1_Local || !Image2_Local) return res.status(400).json({message:"Please Upload All Images"});
    
            const image1 = await uploadOnCloudinary(Image1_Local);
            const image2 = await uploadOnCloudinary(Image2_Local);
    
            if(!image1 || !image2) return res.status(400).json({message:"Images Are Required"})
    
            const buffallo = await Buffalo.create({
                Breed,
                Age,
                CalvinCount,
                MilkCapacity,
                Address,
                Price,
                Owner: req.user._id,
                BuffImage1: image1.url,
                BuffImage2: image2.url,
                location:{
                    type:"Point",
                    coordinates: [longitude,latitude]
                }
            })
    
            if(!buffallo) return res.status(500).json({message:"Failed To Create Post For Buffallo"});
    
            await User.findByIdAndUpdate(req.user._id,
                {
                    $push: {
                      posts: {
                        itemId: buffallo._id,
                        modelType: "Buffalo",
                      },
                    },
                  },
                {new: true}
            );
    
            return res.status(200).json({message:"Buffalo Posted SuccessFully",data:buffallo})
    } catch (error) {
        console.error("Internal Error While Posting Buffallo");
    }
}

const sellGoat = async (req, res) => {
    try {

        const {Breed, Age, Weight, Address, Price, longitude = 0 , latitude = 0 } = req.body;
    
        if([Breed, Age, Weight, Address, Price,].some(field => !field?.trim())){
            return res.status(400).json({message: "All Field Are Required"});
        }
    
            const Image1_Local = req.files?.GoatImage1[0]?.path;
            const Image2_Local = req.files?.GoatImage2[0]?.path;
    
            if(!Image1_Local || !Image2_Local) return res.status(400).json({message:"Please Upload All Images"});
    
            const image1 = await uploadOnCloudinary(Image1_Local);
            const image2 = await uploadOnCloudinary(Image2_Local);
    
            if(!image1 || !image2) return res.status(400).json({message:"Images Are Required"})
    
            const goat = await Goat.create({
                Breed,
                Age,
                Weight,
                Address,
                Price,
                Owner: req.user._id,
                GoatImage1: image1.url,
                GoatImage2: image2.url,
                location:{
                    type:"Point",
                    coordinates: [longitude,latitude]
                }
            })
    
            if(!goat) return res.status(500).json({message:"Failed To Create Post For Goat"});
    
            await User.findByIdAndUpdate(req.user._id,
                {
                    $push: {
                      posts: {
                        itemId: goat._id,
                        modelType: "Goat",
                      },
                    },
                  },
                {new: true}
            );
    
            return res.status(200).json({message:"Goat Posted SuccessFully",data:goat})
    } catch (error) {
        console.error("Internal Error While Posting Goat");
    }
}

const sellHorse = async (req, res) => {
    try {

        const {Breed, Age, Weight, Height, Health, Address, Price, Description, longitude = 0 , latitude = 0 } = req.body;
    
        if([Breed, Age, Weight, Height, Health, Address, Price, Description].some(field => !field?.trim())){
            return res.status(400).json({message: "All Field Are Required"});
        }
    
            const Image1_Local = req.files?.HorseImage1[0]?.path;
            const Image2_Local = req.files?.HorseImage2[0]?.path;
    
            if(!Image1_Local || !Image2_Local) return res.status(400).json({message:"Please Upload All Images"});
    
            const image1 = await uploadOnCloudinary(Image1_Local);
            const image2 = await uploadOnCloudinary(Image2_Local);
    
            if(!image1 || !image2) return res.status(400).json({message:"Images Are Required"})
    
            const horse = await Horse.create({
                Breed,
                Age,
                Weight,
                Height,
                Health,
                Address,
                Price,
                Description,
                Owner: req.user._id,
                HorseImage1: image1.url,
                HorseImage2: image2.url,
                location:{
                    type:"Point",
                    coordinates: [longitude,latitude]
                }
            })
    
            if(!horse) return res.status(500).json({message:"Failed To Create Post For Horse"});
    
            await User.findByIdAndUpdate(req.user._id,
                {
                    $push: {
                      posts: {
                        itemId: horse._id,
                        modelType: "Horse",
                      },
                    },
                  },
                {new: true}
            );
    
            return res.status(200).json({message:"Horse Posted SuccessFully",data:horse})
    } catch (error) {
        console.error("Internal Error While Posting Horse");
    }


}

export { sellCow,
         sellBuffallo,
         sellGoat,
         sellHorse   
} 