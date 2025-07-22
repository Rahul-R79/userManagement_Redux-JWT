import { Link } from "react-router-dom";

function Header(){
    return(
        <nav className="navbar navbar-light bg-primary">
            <div className="container">
                <a className="navbar-brand text-light">User Page</a>
                <form className="d-flex">
                <Link>
                    <img src="/images/user.avif" alt="user-img" className="img-fluid rounded-circle" 
                        style={{ width: "35px", height: "35px", objectFit: "cover" }}
                    />
                </Link>
                <button className="btn btn-outline-light mx-4" type="button">Logout</button>
                </form>
            </div>
        </nav>
    )
}

export default Header;