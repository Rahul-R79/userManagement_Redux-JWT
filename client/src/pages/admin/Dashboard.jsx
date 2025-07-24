import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userLogout } from "../../features/user/userSlice";
import axios from "axios";

function Dashboard(){

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await axios.post("http://localhost:3000/api/auth/logout", {}, { withCredentials: true });
            dispatch(userLogout());
            navigate("/login");
        } catch (error) {
            console.log("Logout failed:", error.message);
        }
    };
    return(
        <div className="container">
            <nav className="mt-4 d-flex justify-content-between">
                <h3>Admin DashBoard</h3>
                <button onClick={handleLogout} className="btn btn-danger">Logout</button>
            </nav>
        </div>
    )
}

export default Dashboard;