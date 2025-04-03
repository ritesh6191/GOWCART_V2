import User from "../models/user.model.js";

const genrateAccessAndRefreshToken = async(userId) => {
    const user = await User.findById(userId)

    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({validateBeforeSave : false});

    return {accessToken, refreshToken}

}

const registerUser = async (req, res) => {
    try {
        const { phone, password, firstName, lastName } = req.body;


        if ([phone, password, firstName, lastName].some(field => !field?.trim())) {
            return res.status(400).json({ message: "All fields are required" });
        }

     
        const existedUser = await User.findOne({ phone });
        if (existedUser) {
            return res.status(400).json({ message: "User with this phone number already exists" });
        }

        
        const user = await User.create({ phone, password, firstName, lastName });

        if (!user) {
            return res.status(500).json({ message: "Failed to create user" });
        }

        const createdUser = await User.findById(user._id).select("-password -refreshToken")

        return res.status(201).json(createdUser);
    } catch (error) {
        console.error("Error in Registering User:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

const loginUser = async(req, res) => {
        const { phone, password} = req.body;

        if([phone, password].some(field => !field?.trim())){
        return res.status(400).json({ message: "Please Enter Phone And Password"})
        }

        const user = await User.findOne({ phone });
        
        if(!user) return res.status(401).json({ message: "User Not Register Please Register First"})

        const isPasswordValid = await user.isPasswordCorrect(password);
            
        if(!isPasswordValid) return res.status(401).json({ message : "Invalid Password"});

        const {accessToken, refreshToken} = await genrateAccessAndRefreshToken(user._id);

        const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

        const option = {
            httpOnly : true,
            secure : true,
        }

        return res.status(200)
        .cookie("accessToken", accessToken, option)
        .cookie("refreshToken", refreshToken, option)
        .json({message : "User Logged In Successefully",
            data : loggedInUser,
        })
}



export { registerUser,
         loginUser };
