import {Route, Routes} from "react-router-dom";

import Register from "../components/LendStreet/Register";
import StartUp from "../components/Platform/StartUp";
import Login from "../components/LendStreet/Login";
import HomePage from "../components/LendStreet/HomePage"

export const MainRoutes = () => {
    return (
            <Routes>
                <Route path="/platform" element={<StartUp />} />
                <Route path="/register" element={<Register />}/>
                <Route path="/login" element={<Login />}/>
                <Route path="/home" element={<HomePage />}/>
            </Routes>
    );
};
