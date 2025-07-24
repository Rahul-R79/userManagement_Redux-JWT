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