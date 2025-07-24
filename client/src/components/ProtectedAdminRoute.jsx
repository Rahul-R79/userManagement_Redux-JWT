import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function ProtectedAdminRoute({ children }) {
    const user = useSelector((state) => state.user.currentUser);
    return user && user.role === "admin" ? children : <Navigate to="/login" replace />;
}

export default ProtectedAdminRoute;
