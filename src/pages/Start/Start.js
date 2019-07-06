import React from "react";
import "./Start.css";
import { Link } from "react-router-dom";

// Start page

const Start = props => (
 <div className="Start">
   <h3>Start Page</h3>
   <Link to='/play'>Start</Link>
 </div>
);

export default Start;