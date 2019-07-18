import React from "react";
import "./Start.css";
import { Link } from "react-router-dom";

// Start page

const Start = props => (
 <div className="Start">
     <img className='cloud cloud1' src='images/cloud.svg' alt='cloud' />
     <img className='cloud cloud2' src='images/cloud.svg' alt='cloud' />
     <img className='cloud cloud3' src='images/cloud.svg' alt='cloud' />
     <img className='cloud cloud4' src='images/cloud.svg' alt='cloud' />
     <div className="start-window">
   <h3>Welcome to My World of Bugs!</h3>
   <div className='start-body'>
     <img className='spider' src='images/spinyorbweaver2.svg' alt='spiny orb-weaver' />
     <div className='start-body-about'>
     <p>Catch insects and then learn about them!</p>
     </div>
     <div className='start-body-nav'>
   <Link to='/play'>Start</Link>
   <Link to='/about'>About</Link>
   </div>
   <div className='start-body-instructions'>
     <h4>How to play:</h4>
     <p>Click the correct bug to win, but don't run out of stamina!</p>
   </div>
   </div>
   </div>
   </div>

);

export default Start;