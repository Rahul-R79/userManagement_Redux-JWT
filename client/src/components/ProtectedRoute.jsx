//user protected route

import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children }) => {
    const user = useSelector((state) => state.user.currentUser);
    return user && user.role === "user" ? children : <Navigate to="/login" replace />;
};
