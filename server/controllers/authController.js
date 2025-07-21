import User from "../model/User.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const signin = async(req, res, next)=>{
    const {userName, email, password} = req.body;
    const newUser = new User({userName, email, password});
    try{
        await newUser.save();
        res.status(201).json({message: 'user created successfully'});
    }catch(err){
        next(err)
    }
}

export const login = async(req, res, next)=>{
    const {email, password} = req.body;
    try{
        const validUser = await User.findOne({email});
        if(!validUser) return res.status(400).json({message: 'Invalid email or password'});
        const validPassword = bcrypt.compareSync(password, validUser.password);
        if(!validPassword) return res.status(400).json({message: 'Invalid email or password'});
        const token = jwt.sign({id: validUser._id}, process.env.JWT_SECRET);
        const {password: hashedPassword, ...rest} = validUser._doc;
        res.cookie('access-token', token, 
            {httpOnly: true, 
            secure: true,
            sameSite: 'Strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        })
        res.status(200).json(rest);
    }catch(err){
        next(err);
    }
}