//token verification for admin

export const isAdmin = async(req, res, next)=>{
    try{
        if(req.user?.role === 'admin'){
            return next();
        }else{
            return res.status(403).json({message: 'access denied'});
        }
    }catch(error){
        return res.status(500).json({message: 'server eroor in admin check'})
    }
}