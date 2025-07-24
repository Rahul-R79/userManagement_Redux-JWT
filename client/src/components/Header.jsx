import { Link, useNavigate } from "react-router-dom";
import { userLogout } from "../features/user/userSlice";
import { useDispatch } from "react-redux";
import axios from "axios";

function Header() {
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

    return (
        <nav className="navbar navbar-light bg-primary">
            <div className="container">
                <a className="navbar-brand text-light">User Page</a>
                <form className="d-flex">
                    <Link to="/user/profile">
                        <img src="/images/user.avif" alt="user" className="img-fluid rounded-circle" style={{ width: "35px", height: "35px", objectFit: "cover" }}/>
                    </Link>
                    <button className="btn btn-outline-light mx-4" type="button" onClick={handleLogout}>
                        Logout
                    </button>
                </form>
            </div>
        </nav>
    );
}

export default Header;
