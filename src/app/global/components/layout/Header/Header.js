import React from 'react';
import { NavLink } from 'react-router-dom';

import './header.css';

const Header = () => {
  return (

    <header>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="#">Chart React and Fetch post </a>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav  navbar-right">

              <NavLink to='/' exact activeClassName='active' >
                Home
              </NavLink>


              <NavLink to='/linegraph'  activeClassName='active' >
                Line Graph
              </NavLink>


              <NavLink to='/post'  activeClassName='active' >
                Post
              </NavLink>

          </ul>
        </div>
    </nav>
    </header>
  );
};


export default Header;
