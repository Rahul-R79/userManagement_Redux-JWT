import User from "../model/User.js";

export const getUsers = async(req, res)=>{
    try{
        const users = await User.find({role: {$ne: 'admin'}}, '-password');
        res.status(200).json(users);
    }catch(error){
        res.status(500).json({message: 'error in fetching data'});
    }
}

export const deleteUser = async(req, res)=>{
    try{
        const userId = req.params.id;

        const user = await User.findById(userId);
        if(!user) return res.status(404).json({message: 'user not found'});

        await User.findByIdAndDelete(userId);
        res.status(200).json({message: 'user deleted successfully'});
    }catch(error){
        res.status(500).json({message: 'error in deleting user'});
    }
}

export const searchUser = async(req, res)=>{
    try{
        const search = req.query.search || '';
        const regex = new RegExp(search, 'i');

        const users = await User.find({$or: [{userName: {$regex: regex}}, {email: {$regex: regex}}]}).select('-password');
        res.status(200).json(users);
    }catch(error){
        res.status(500).json({message: 'error in search', error});
    }
}

export const getSingleUser = async(req, res)=>{
    try{
        const userId = req.params.id;
        const user = await User.findById(userId).select('-password');
        res.status(200).json(user);
    }catch(error){
        res.status(500).json({message: 'error in fetching user', error});
    }
}

export const updateUser = async(req, res)=>{
    try{
        const {userName, email, profileImage} = req.body;

        const updatedUser = await User.findByIdAndUpdate(req.params.id, 
            {userName, email, profileImage}, {new: true, runValidators: true}
        );

        if(!updatedUser) return res.status(404).json({message: 'user not found'});
        res.status(200).json({message: 'user updated'});
    }catch(error){
        res.status(500).json({message: 'eroor updating user'});
    }
}