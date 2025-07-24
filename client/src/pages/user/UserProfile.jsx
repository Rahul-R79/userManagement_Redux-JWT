import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {updateProfile, updateProfileStart, updateProfileFailure} from "../../features/user/userSlice";
import "../../index.css";

function UserProfile() {
    const { currentUser, updateLoading, updateError } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const initialName = currentUser?.userName || "";
    const initialPreview = currentUser?.profileImage || "";

    const [name, setName] = useState(initialName);
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(initialPreview);
    const [editMode, setEditMode] = useState(false);
    const editRef = useRef(null);

    useEffect(() => {
        if (image) {
            const reader = new FileReader();
            reader.onloadend = () => setPreview(reader.result);
            reader.readAsDataURL(image);
        }
    }, [image]);

    const validateName = (name) => {
        if (!name.trim()) return "Name is required.";
        if (name.trim().length < 3) return "Name must be at least 3 characters.";
        if (!/^[A-Za-z\s]+$/.test(name)) return "Name must contain only letters.";
        return "";
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationError = validateName(name);
        if (validationError) {
            dispatch(updateProfileFailure(validationError));
            return;
        }

        const formData = new FormData();
        formData.append("name", name);
        if (image) formData.append("image", image);

        try {
            dispatch(updateProfileStart());
            const response = await axios.put( "http://localhost:3000/api/user/profile", formData,
                { withCredentials: true }
            );

            dispatch(updateProfile({
                    userName: response.data.userName,
                    profileImage: response.data.profileImage,
                })
            );

            setImage(null);
            setPreview(response.data.profileImage);
            setEditMode(false);
        }catch(error){
            dispatch(updateProfileFailure(error.response?.data?.message || error.message));
            console.log("update-failed", error.message);
        }
    };

    const handleCancel = () => {
        setName(initialName);
        setPreview(initialPreview);
        setEditMode(false);
        dispatch(updateProfileFailure(null)); 
    };

    const handleEdit = () => {
        setEditMode(true);
        setTimeout(() => editRef.current?.focus(), 0);
    };

    useEffect(() => {
        dispatch(updateProfileFailure(null));
        return () => {
            dispatch(updateProfileFailure(null));
        };
    }, [dispatch]);

    const isChanged = name !== initialName || image !== null;

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card shadow rounded-4">
                        <div className="card-header bg-secondary text-white text-center rounded-top-4">
                            <h4 className="mb-0">User Profile Page</h4>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-4 text-center position-relative">
                                    <label htmlFor="profileImageInput" style={{ cursor: "pointer" }}>
                                        <img src={preview || "./images/user.avif"} alt="Profile" className="rounded-circle border hover-shadow"
                                            style={{width: "120px", height: "120px", objectFit: "cover"}}
                                            title="Click to change image"
                                        />
                                    </label>
                                    <input id="profileImageInput" type="file" accept="image/*" style={{ display: "none" }}
                                        onChange={(e) => setImage(e.target.files[0])}
                                    />
                                </div>
                                <div className="mb-3 position-relative">
                                    <label className="form-label">Enter your name</label>
                                    <div className="input-group">
                                        <input type="text" name="userName" value={name} className='form-control' placeholder="Enter your name"
                                            onChange={(e)=>setName(e.target.value)}
                                            disabled={!editMode}
                                            ref={editRef}
                                        />
                                        <button type="button" className="btn btn-outline-primary"
                                            onClick={handleEdit}
                                        >
                                            <i className="bi bi-pencil-square"></i> Edit
                                        </button>
                                    </div>
                                    {updateError && <small className="text-danger">{updateError}</small>}
                                </div>
                                {isChanged && (
                                    <div className="d-flex justify-content-between mt-4">
                                        <button type="button" onClick={handleCancel} className="btn btn-outline-secondary">
                                            Cancel
                                        </button>
                                        <button type="submit" className="btn btn-success fw-semibold" disabled={updateLoading}>
                                            {updateLoading ? "Saving..." : "Save"}
                                        </button>
                                    </div>
                                )}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserProfile;
