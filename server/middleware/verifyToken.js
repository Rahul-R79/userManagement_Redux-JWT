import { verifyToken } from "../utils/jwt";

export const ProtectRoute = (req, res, next)=>{
    const token = req.cookies["access-token"];

    if(!token) return res.status(401).json({message: 'Access denied'});

    try{
        const decoded = verifyToken(token);
        req.user = decoded;
        next();
    }catch(error){
        res.status(401).json({message: 'Invalid Token'});
    }
}