import { Link} from "react-router-dom";
import Logout from "./Logout";

function Header() {

    return (
        <nav className="navbar navbar-light bg-primary">
            <div className="container">
                <a className="navbar-brand text-light">User Page</a>
                <form className="d-flex justify">
                    <Link to="/user/profile">
                        <img src="/images/user.avif" alt="user" className="img-fluid rounded-circle" style={{ width: "35px", height: "35px", objectFit: "cover" }}/>
                    </Link>
                    <div className="mx-4">
                        <Logout/>
                    </div>
                </form>
            </div>
        </nav>
    );
}

export default Header;
