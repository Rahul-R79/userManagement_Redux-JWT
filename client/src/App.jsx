import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/user/Login";
import Home from "./pages/user/Home";
import UserProfile from "./pages/user/UserProfile";
import SignIn from "./pages/user/SignIn";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { PublicRoute } from "./components/PublicRoute";
import Dashboard from "./pages/admin/Dashboard";
import ProtectedAdminRoute from "./components/ProtectedAdminRoute"

function App(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={
                <PublicRoute>
                    <Login/>
                </PublicRoute>}/>
                <Route path="/signin" element={
                <PublicRoute>
                    <SignIn/>
                </PublicRoute>}/>
                <Route path="/home" element={
                <ProtectedRoute>
                    <Home/>
                </ProtectedRoute>}>
                </Route>
                <Route path="/user-profile" element={
                <ProtectedRoute>
                    <UserProfile/>
                </ProtectedRoute>}/>
                <Route path="/dashboard" element={<ProtectedAdminRoute>
                    <Dashboard/>
                </ProtectedAdminRoute>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default App;