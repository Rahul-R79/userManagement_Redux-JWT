import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";


function ProtectedAdminRoute({children}){
    const user = useSelector((state)=> state.user.currentUser);
    if (!user || user.role !== "admin") {
        return <Navigate to="/" replace />;
    }
    
    return children
}

export default ProtectedAdminRoute;