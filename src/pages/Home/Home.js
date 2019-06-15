import React from "react";
import "./Home.css";
import Nav from '../../components/Nav';
import Play from '../../components/Play';
import Stats from '../../components/Stats'

// Component for the Navbar

const Home = props => (
  <div className="Home">
    <Nav />
    <div className="Game">
    <Play />
    <Stats />
    </div>
    
  </div>
);

export default Home;