import React from "react";
import {Outlet, useNavigate} from "react-router-dom";

function Layout () {
    const navigate = useNavigate();
    const goWelcome = () => {
        navigate("/Welcome")
    }
    return (
        <>
            <nav class="navbar bg-primary">
                <div class="container-fluid">
                    <a class="navbar-brand" href="/">
                    <img src="https://cdn-icons-png.flaticon.com/512/1235/1235814.png" alt="Logo" width="30" height="24" class="d-inline-block align-text-top" />
                    Rome
                    </a>
                </div>
            </nav> 
            <Outlet />
        </>
    );
};

export default Layout;