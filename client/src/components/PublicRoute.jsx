import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom";

export const PublicRoute = ({children})=>{
    const user = useSelector((state) => state.user.currentUser);
    return user ? <Navigate to='/home' replace/> : children
}