import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import UserProfile from "./pages/UserProfile";
import SignIn from "./pages/SignIn"

function App(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login/>}/>
                <Route path="/signin" element={<SignIn/>}/>
                <Route path="/home" element={<Home/>}/>
                <Route path="/user-profile" element={<UserProfile/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default App;