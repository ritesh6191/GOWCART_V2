import User from "../models/user.model.js";


const loginUser = async ( req, res) => {

    const {Phone, FirstName, LastName} = req.body;
    console.log(Phone);

    if(
        [ Phone, FirstName, LastName].some((field) => field?.trim() === "" )
    ){
        console.log("All Fields Are Required")
    }

     const existedUser = await User.findOne({Phone});

      if (existedUser){
         res.send("User With This Phone Number Already Exists")
      }

    const user = await User.create({
        Phone : Phone,
        FirstName : FirstName,
        LastName : LastName
    })

    if(!user){
        res.send("Failed To Create User")
    }

    return res.send(user);
}

export { loginUser };