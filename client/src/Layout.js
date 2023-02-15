import React from "react";
import {Outlet} from "react-router-dom";

function Layout () {
  return (
    <>
      <nav class="navbar bg-body-primary">
        <div class="container-fluid">
            <a class="navbar-brand" href="#">
            <img src="https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.freepik.com%2Ffree-icon%2Fcolosseum_15580836.htm&psig=AOvVaw0z9LO6oe9vLyvUjufaT_s1&ust=1676584956751000&source=images&cd=vfe&ved=0CA8QjRxqFwoTCOj5pujDmP0CFQAAAAAdAAAAABAD" alt="Logo" width="30" height="24" class="d-inline-block align-text-top" />
            Rome
            </a>
        </div>
        </nav>
      <Outlet />
    </>
  );
};

export default Layout;