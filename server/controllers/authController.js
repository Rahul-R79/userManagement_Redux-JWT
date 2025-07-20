import User from "../model/User.js";

export const signup = async(req, res, next)=>{
    const {userName, email, password} = req.body;
    const newUser = new User({userName, email, password});
    try{
        await newUser.save();
        res.status(201).json({message: 'user created successfully'});
    }catch(err){
        next(err)
    }
    console.log(newUser)
}

