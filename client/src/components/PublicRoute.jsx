import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export const PublicRoute = ({ children }) => {
    const user = useSelector((state) => state.user.currentUser);

    if (!user) return children;

    return user.role === "admin" ? (
        <Navigate to="/admin/dashboard" replace />
    ) : (
        <Navigate to="/user/home" replace />
    );
};
