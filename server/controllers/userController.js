import User from "../model/User.js";

//userprofile controller
export const getUserProfile = async(req, res, next)=>{
    try{
        const user = await User.findById(req.user.id).select('-password');
        if(!user) return res.status(404).json({message: 'user not found'});
        res.status(200).json(user);
    }catch(error){
        next(error);
    }
}

//update userProfile controller
export const updateUserProfile = async(req, res, next)=>{
    const {name} = req.body;
    const image = req.file?.path;
    try{
        const user = await User.findById(req.user.id);
        if(!user) return res.status(404).json({message: 'user not found'});

        user.userName = name || user.userName;
        if(image) user.profileImage = image;

        const updatedUser = await user.save();
        res.status(200).json(updatedUser);
    }catch(error){
        next(error);
    }
}