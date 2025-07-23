import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux"

function UserProfile(){
    const {currentUser} = useSelector(state => state.user);

    const [name, setName] = useState(currentUser?.userName || '');
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(currentUser?.profileImage || '');

    useEffect(()=>{
        if(image){
            const reader = new FileReader();
            reader.onloadend = () => setPreview(reader.result);
            reader.readAsDataURL(image);
        }
    }, [image]);

    const handleSubmit = async (e)=>{
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', name);
        if(image) formData.append('image', image);

        try{
            const response = await axios.put('http://localhost:3000/api/user/profile', formData, 
                {
                    headers: { 'Content-Type': 'multipart/form-data' },
                    withCredentials: true,
                }          
            );
            console.log('user-updated', response.data);
        }catch(error){
            console.log('updated-failed', error.message);
        }
    }
    return(
        <form onSubmit={handleSubmit}>
            <div>
                <img src={preview || './images/user.avif'} alt="Profile" className="w-100"/>
                <input type='file' accept="image/*" onChange={(e)=> setImage(e.target.files[0])}/>
            </div>
            <input type="text" name="name" value={name} onChange={(e)=> setName(e.target.value)}/>
            <button type='submit'>Save</button>
        </form>
    )
}

export default UserProfile