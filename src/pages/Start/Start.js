import React from "react";
import "./Start.css";
import { Link } from "react-router-dom";

// Start page

const Start = props => (
 <div className="Start">
   <div>
   <h3>Welcome to My World of Bugs!</h3>
   <p>Catch the correct bug, but don't run out of energy!</p>
   <Link to='/play'>Start</Link>
   </div>
 </div>
);

export default Start;