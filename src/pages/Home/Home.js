import React from "react";
import "./Home.css";
import Nav from '../../components/Nav';
import Game from '../../components/Game';

// Component for the Navbar

const Home = props => (
  <div className="Home">
    <Nav />
    <Game />
    </div>
);

export default Home;