import {Route, Routes} from "react-router-dom";

import Register from "../components/LendStreet/Register";
import StartUp from "../components/Platform/StartUp";
import Login from "../components/LendStreet/Login";
import HomePage from "../components/LendStreet/HomePage"
import Calculator from "../components/LendStreet/Calculator";
import YourLoans from "../components/LendStreet/YourLoans";

export const MainRoutes = () => {

    const isLoggedIn = localStorage.getItem('isLoggedIn');

    return (
            <Routes>
                <Route path="/platform" element={<StartUp />} />
                <Route path="/register" element={<Register />}/>
                <Route path="/login" element={<Login />}/>
                <Route path="/calculator" element={<Calculator/>}></Route>

                { isLoggedIn === 'true' ?
                <>

                <Route path="/home" element={<HomePage />}/> 
                <Route path="/yourloans" element={<YourLoans/>}/>
                </>
                : <Route path="/login" element={<Login />}/> }

            </Routes>
    );
};
