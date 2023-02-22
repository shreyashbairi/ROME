import React from "react";
import {Outlet, useNavigate} from "react-router-dom";
import '../css/DefaultLayout.css'

function DefaultLayout () {
    const navigate = useNavigate();
    const goWelcome = () => {
        navigate("/Welcome")
    }
    return (
        <>
            <nav class="navbar navbar-light bg-primary mt-1 rounded">
                    <a class="navbar-brand" href="/main">
                    <img src="https://cdn-icons-png.flaticon.com/512/1235/1235814.png" alt="Logo" width="30" height="24" class="pic d-inline-block align-text-top" />
                    Rome
                    </a>
                    <a class="navbar-brand" href="/profile">                    
                                <img src="https://cdn-icons-png.flaticon.com/512/126/126472.png" alt="Logo" width="30" height="24" class="" />
                    </a>


            </nav> 
            <Outlet />
        </>
    );
};

export default DefaultLayout;