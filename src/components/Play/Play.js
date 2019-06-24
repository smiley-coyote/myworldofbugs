import React from "react";
import "./Play.css";

// Component for the Stats 

const Play = props => (
 <div onClick={props.onClick} className="Play">
   {props.children}
 </div>
);

export default Play;