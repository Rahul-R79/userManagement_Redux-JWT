import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser, loginFailure, loginSuccess, resetError } from "../../features/user/userSlice";
import { useDispatch, useSelector } from "react-redux";

function Login() {
    const [inputValue, setInputValue] = useState({});
    const {loginLoading, loginError, currentUser} = useSelector((state) => state.user);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(resetError());
    }, [dispatch]);

    useEffect(() => {
        if (currentUser) {
            if (currentUser.role === "admin") {
                navigate("/admin/dashboard", { replace: true });
            } else {
                navigate("/user/home", { replace: true });
            }
        }
    }, [currentUser, navigate]);

    const handleInputChange = (e) => {
        setInputValue({ ...inputValue, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(loginUser());
        try {
            const response = await axios.post("http://localhost:3000/api/auth/login", inputValue,
                { withCredentials: true }
            );
            dispatch(loginSuccess(response.data.user));
            console.log(response.data);
        } catch (error) {
            if (error.response?.data?.errors) {
                const errMap = {};
                error.response.data.errors.forEach((element) => {
                    errMap[element.path] = element.msg;
                });
                dispatch(loginFailure(errMap));
            } else if (error.response?.data?.message) {
                dispatch(loginFailure({ general: error.response.data.message }));
            } else {
                dispatch(loginFailure({ general: "Network failure. Please try again later!" }));
            }
        }
    };

    return (
        <div className="container">
            <div className="row justify-content-center align-items-center min-vh-100">
                <div className="col-md-6">
                    <div className="card shadow rounded-4">
                        <div className="card-body p-4">
                            <h2 className="text-center mb-4">Account Login</h2>
                            {loginError.general && (
                                <p className="text-center text-danger">{loginError.general}</p>
                            )}
                            <form noValidate onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email address</label>
                                    <input type="email" className="form-control" id="email" name="email" placeholder="Enter email" autoComplete="email" required 
                                        onChange={handleInputChange}
                                    />
                                    {loginError.email && (
                                        <small className="text-danger">{loginError.email}</small>
                                    )}
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <input type="password" className="form-control" id="password" name="password" placeholder="Enter password" autoComplete="current-password" required 
                                        onChange={handleInputChange}
                                    />
                                    {loginError.password && (
                                        <small className="text-danger">{loginError.password}</small>
                                    )}
                                </div>
                                <div className="mt-3 mb-3">
                                    <label>
                                        Dont have an account? <Link to={"/signup"}>Sign In</Link>
                                    </label>
                                </div>
                                <div className="d-grid">
                                    <button type="submit" className="btn btn-secondary" disabled={loginLoading}>
                                        {loginLoading ? "Loading..." : "Login"}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
