import React from "react";
import "./Play.css";

// Component for the Stats

const Play = props => (
 <div className="Play">
   <img onClick={props.onClick} id="ladybug" alt="ladybug" src="ladybug.png" />
 </div>
);

export default Play;