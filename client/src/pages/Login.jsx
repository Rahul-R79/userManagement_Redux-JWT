import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { loginUser, loginFailure, loginSuccess, resetError } from "../features/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

function Login(){
    const [inputvalue, setInputValue] = useState({});
    const {loginLoading, loginError} = useSelector((state)=> state.user);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(resetError())
    }, [dispatch]);

    const handleInputvalue = (e)=>{
        setInputValue({...inputvalue, [e.target.id] : e.target.value});
    }

    const handleSubmit = async(e)=>{
        e.preventDefault();
        dispatch(loginUser())
        try{
            const response = await axios.post('http://localhost:3000/api/auth/login', inputvalue, 
                {withCredentials: true}
            );
            console.log('backend response', response.data);
            dispatch(loginSuccess(response.data));
            navigate('/home');
        }catch(error){
            if(error.response && error.response.data.errors){
                const errMap = {};
                error.response.data.errors.forEach(element => {
                    errMap[element.path] = element.msg;
                });
                dispatch(loginFailure(errMap))
            }else if(error.response?.data?.message){
                dispatch(loginFailure({general: error.response.data.message}));
            }else{
                dispatch(loginFailure({general: 'Network failure please try again later!'}))
            }
        }
    }
    
    return(
        <div className="container">
            <div className="row justify-content-center align-items-center min-vh-100">
                <div className="col-md-6">
                <div className="card shadow rounded-4">
                    <div className="card-body p-4">
                    <h2 className="text-center mb-4">Account Login</h2>
                    {loginError.general && <p className="text-center text-danger">{loginError.general}</p>}
                    <form noValidate onSubmit={handleSubmit}>
                        {/* Email */}
                        <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            name="email"
                            placeholder="Enter email"
                            autoComplete="email"
                            required
                            onChange={handleInputvalue}
                        />
                        {loginError.email && <small className="text-danger">{loginError.email}</small>}
                        </div>

                        {/* Password */}
                        <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            name="password"
                            placeholder="Enter password"
                            autoComplete="current-password"
                            required
                            onChange={handleInputvalue}
                        />
                        {loginError.password && <small className="text-danger">{loginError.password}</small>}
                        </div>
                        <div className="mt-3 mb-3">
                            <label>Dont have an account? <Link to={'/signin'}>SignIn</Link></label>
                        </div>
                        {/* Submit Button */}
                        <div className="d-grid">
                        <button type="submit" className="btn btn-secondary" disabled={loginLoading}>{loginLoading ? "loading...." : "Login"}</button>
                        </div>
                    </form>
                    </div>
                </div>
                </div>
            </div>
        </div>
    )
}

export default Login;