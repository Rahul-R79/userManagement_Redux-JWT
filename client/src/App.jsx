import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/user/Login";
import Home from "./pages/user/Home";
import UserProfile from "./pages/user/UserProfile";
import SignIn from "./pages/user/SignIn";
import Dashboard from "./pages/admin/Dashboard";

import { ProtectedRoute } from "./components/ProtectedRoute";
import { PublicRoute } from "./components/PublicRoute";
import ProtectedAdminRoute from "./components/ProtectedAdminRoute";
import CreateUser from "./pages/admin/CreateUser";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={
                    <PublicRoute>
                        <Login />
                    </PublicRoute>
                } />

                <Route path="/login" element={
                    <PublicRoute>
                        <Login />
                    </PublicRoute>
                } />

                <Route path="/signup" element={
                    <PublicRoute>
                        <SignIn />
                    </PublicRoute>
                } />

                <Route path="/user/home" element={
                    <ProtectedRoute>
                        <Home />
                    </ProtectedRoute>
                } />

                <Route path="/user/profile" element={
                    <ProtectedRoute>
                        <UserProfile />
                    </ProtectedRoute>
                } />

                <Route path="/admin/dashboard" element={
                    <ProtectedAdminRoute>
                        <Dashboard />
                    </ProtectedAdminRoute>
                } />
                <Route path="/admin/create-user" element={
                    <ProtectedAdminRoute>
                        <CreateUser />
                    </ProtectedAdminRoute>
                } />            
            </Routes>
        </BrowserRouter>
    );
}

export default App;
