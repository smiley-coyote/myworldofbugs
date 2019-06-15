import React from "react";
import "./Nav.css";

// Component for the Navbar

const Nav = props => (
  <nav className="navbar">
    <ul>
      <li className="brand">
        <a href="/">My World of Bugs</a>
      </li>
      
      <li>
        <a href='/'>Restart</a> |  <a href='/'>Quit</a>  |  <a href='/about'>About</a>
      </li>
    </ul>
  </nav>
);

export default Nav;