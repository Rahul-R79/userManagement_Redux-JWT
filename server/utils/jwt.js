//jwt configuration

import jwt from 'jsonwebtoken'

export const generateToken = (payload)=>{
    return jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: '7d'})
    
}

export const verifyToken = (token)=>{
    try{
        return jwt.verify(token, process.env.JWT_SECRET)
    }catch(error){
        console.log('verifyToken error', error.message);
        return null;
    }
}