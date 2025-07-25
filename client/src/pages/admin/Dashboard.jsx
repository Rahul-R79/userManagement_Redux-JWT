//admin dashboard page
import axios from "axios";
import { useEffect, useState } from "react";
import Logout from "../../components/Logout";
import { Link } from "react-router-dom";

function Dashboard() {
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [userToDelete, setUserToDelete] = useState(null); 
    const [searchUser, setSearchUser] = useState('');
    const usersPerPage = 3;

    const fetchUsers = async () => {
        try {
            const endpoint = searchUser.trim() ? 
                `http://localhost:3000/api/admin/search-users?search=${searchUser}` 
                : `http://localhost:3000/api/admin/users`
            const res = await axios.get(endpoint, { withCredentials: true });
            setUsers(res.data);
        } catch (err) {
            console.error("Error fetching users", err.message);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, [searchUser]);

    const deleteUser = async () => {
        if (!userToDelete) return;
        try {
            await axios.delete(`http://localhost:3000/api/admin/users/${userToDelete._id}`, { withCredentials: true });
            fetchUsers();
            setUserToDelete(null); 
        } catch (error) {
            console.log('Failed to delete:', error.message);
        }
    };

    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
    const totalPages = Math.ceil(users.length / usersPerPage);

    const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="container mt-4">
            <nav className="container mb-4">
                <div className="row align-items-center">
                    <div className="col-md-4 col-sm-12 mb-2 mb-md-0">
                        <h3 className="m-0">Admin Dashboard</h3>
                    </div>
                    <div className="col-md-4 col-sm-12 mb-2 mb-md-0">
                        <div className="input-group">
                            <input type="search" className="form-control" placeholder="Search user..." aria-label="Search user" value={searchUser}
                            onChange={(e)=> {setSearchUser(e.target.value); setCurrentPage(1)}}/>
                            <span className="input-group-text bg-white">
                                <i className="bi bi-search"></i>
                            </span>
                        </div>
                    </div>
                    <div className="col-md-4 col-sm-12 d-flex justify-content-md-end justify-content-start align-items-center gap-2">
                        <Link to="/admin/create-user" className="btn btn-primary">Create User</Link>
                        <Logout />
                    </div>
                </div>
            </nav>

            <div className="row g-4 mt-5">
                <h5 className="mb-3">All Registered Users</h5>
                {currentUsers.length > 0 ? (
                    currentUsers.map((user) => (
                        <div className="col-md-4" key={user._id}>
                            <div className="card shadow-sm h-100">
                                <div className="card-body d-flex flex-column align-items-center text-center">
                                    <img
                                        src={user.profileImage || "/images/user.avif"}
                                        alt="username"
                                        className="rounded-circle mb-3"
                                        style={{ width: "100px", height: "100px", objectFit: "cover" }}
                                    />
                                    <h5 className="card-title">{user.userName}</h5>
                                    <p className="card-text text-muted">{user.email}</p>
                                    <div>
                                        <Link className="btn btn-sm btn-info me-2" to={`/admin/edit-user/${user._id}`}>Edit</Link>
                                        <button 
                                            className="btn btn-sm btn-danger" 
                                            data-bs-toggle="modal" 
                                            data-bs-target="#deleteModal"
                                            onClick={() => setUserToDelete(user)}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center">No users found.</p>
                )}
            </div>
            <div className="modal fade" id="deleteModal" tabIndex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="deleteModalLabel">Confirm Delete</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <small>Are you sure you want to delete <strong>{userToDelete?.userName}</strong>?</small>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                            <button
                                type="button"
                                className="btn btn-danger"
                                data-bs-dismiss="modal"
                                onClick={deleteUser}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {totalPages > 1 && (
                <nav className="d-flex justify-content-center mt-4">
                    <ul className="pagination">
                        {[...Array(totalPages)].map((_, i) => (
                            <li
                                key={i}
                                className={`page-item ${currentPage === i + 1 ? "active" : ""}`}
                                onClick={() => handlePageChange(i + 1)}
                                style={{ cursor: "pointer" }}
                            >
                                <span className="page-link">{i + 1}</span>
                            </li>
                        ))}
                    </ul>
                </nav>
            )}
        </div>
    );
}

export default Dashboard;