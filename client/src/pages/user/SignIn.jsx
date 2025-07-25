//signin page

import axios from "axios";
import { useState } from "react"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom";

function SignIn(){
    const [inputData, setInputData] = useState({});
    const [error, setError] = useState({});
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleChange = (e)=>{
        setInputData({...inputData, [e.target.id] : e.target.value});
        setError({...error, [e.target.id] : ''});
    }

    const handleSubmit = async(e)=>{
        e.preventDefault();
        setLoading(true);
        setError({});
        try{
            const response = await axios.post('http://localhost:3000/api/auth/signin', inputData, 
                {withCredentials: true}
            );
            console.log('backend response:', response.data);
            setLoading(false);
            navigate('/');
        }catch(error){
            setLoading(false);
            if(error.response && error.response.data.errors){
                const errMap = {};
                error.response.data.errors.forEach(element => {
                    errMap[element.path] = element.msg;
                });
                setError(errMap);
            }else if(error.response?.data?.message){
                setError({general: error.response.data.message});
            }else{
                setError({general: 'Network failure please try again later!'})
            }
        }
    }
    return(
        <div className="container">
            <div className="row justify-content-center align-items-center min-vh-100">
                <div className="col-md-6">
                <div className="card shadow rounded-4">
                    <div className="card-body p-4">
                    <h2 className="text-center mb-4">Create an account</h2>
                    {error.general && <p className="text-danger text-center">{error.general}</p>}
                    <form onSubmit={handleSubmit} noValidate>
                        <div className="mb-3">
                            <label htmlFor="username" className="form-label">Username</label>
                            <input type="text" className="form-control" id="userName" name="userName" placeholder="Enter username" required autoComplete="userName" 
                                onChange={handleChange}
                            />
                            {error.userName && <small className="text-danger">{error.userName}</small>}
                        </div>

                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email address</label>
                            <input type="email" className="form-control" id="email" name="email" placeholder="Enter email" autoComplete="email" required
                                onChange={handleChange}
                            />
                            {error.email && <small className="text-danger">{error.email}</small>}
                        </div>

                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input type="password" className="form-control" id="password" name="password" placeholder="Enter password" autoComplete="new-password" required 
                                onChange={handleChange}
                            />
                            {error.password && <small className="text-danger">{error.password}</small>}
                        </div>

                        <div className="mb-3">
                            <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                            <input type="password" className="form-control" id="confirmPassword" name="confirmPassword" placeholder="Confirm password" autoComplete="new-password" required
                                onChange={handleChange}
                            />
                            {error.confirmPassword && <small className="text-danger">{error.confirmPassword}</small>}
                        </div>

                        <div className="mt-3 mb-3">
                            <label>Already have an account? <Link to={'/login'}>Login</Link></label>
                        </div>

                        <div className="d-grid">
                            <button type="submit" className="btn btn-secondary" disabled={loading}>{loading ? 'loading...' : 'signup'}</button>
                        </div>
                    </form>
                    </div>
                </div>
                </div>
            </div>
        </div>
    )
}

export default SignIn