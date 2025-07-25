//logout button

import axios from "axios";
import { useNavigate } from "react-router-dom";
import { userLogout } from "../features/user/userSlice";
import { useDispatch } from "react-redux";

function Logout({children}){
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = async()=>{
        try {
            await axios.post("http://localhost:3000/api/auth/logout", {}, { withCredentials: true });
            dispatch(userLogout());
            navigate("/login");
        } catch (error) {
            console.log("Logout failed:", error.message);
        }
    }

    return(
        <button onClick={handleLogout} className="btn btn-danger">
            {children || "Logout"}
        </button>
    )
};

export default Logout;