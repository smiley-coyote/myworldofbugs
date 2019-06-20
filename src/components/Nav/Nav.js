import React from "react";
import { Link } from "react-router-dom";
import "./Nav.css";

// Component for the Navbar

const Nav = props => (
  <nav className="navbar">
    <ul>
      <li className="brand">
        <Link to="/">My World of Bugs</Link>
      </li>
      
      <li>
        <Link to='/play'>Play</Link> |  <Link to='/'>Quit</Link>  |  <Link to='/about'>About</Link>
      </li>
    </ul>
  </nav>
);

export default Nav;