import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import UserProfile from "./pages/UserProfile";
import SignIn from "./pages/SignIn"
import { ProtectedRoute } from "./components/ProtectedRoute";
import { PublicRoute } from "./components/PublicRoute";

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
                <Route path="/user-profile" element={<UserProfile/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default App;