//edit the existing user in admin page
import axios from "axios"
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function EditUser() {
    const [formData, setFormData] = useState({userName: '', email: ''});
    const {id} = useParams();
    const navigate = useNavigate();

    useEffect(()=> {
        const fetchUser = async()=>{
            try{
                const resposne = await axios.get(`http://localhost:3000/api/admin/users/${id}`, {withCredentials: true});
                setFormData({userName: resposne.data.userName, email: resposne.data.email});
            }catch(error){
                console.error(error.message);
            }
        }
        fetchUser();
    }, [id]);

    const handleChange = (e)=>{
        setFormData({...formData, [e.target.id] : e.target.value});
    };

    const handleSubmit = async(e)=>{
        e.preventDefault();
        try{
            await axios.put(`http://localhost:3000/api/admin/users/${id}`, formData, {withCredentials: true});
            navigate('/admin/dashboard');
        }catch(error){
            console.error('failed to update user', error.message);
        }
    }


    return (
        <div className="container mt-5 w-50">
            <h3>Edit User</h3>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label>User Name</label>
                    <input type="text" id="userName" value={formData.userName} onChange={handleChange} className="form-control" required />
                </div>
                <div className="mb-3">
                    <label>Email</label>
                    <input type="email" id="email" value={formData.email} onChange={handleChange} className="form-control" required />
                </div>
                <button type="submit" className="btn btn-success">Update</button>
            </form>
        </div>
    )
}

export default EditUser