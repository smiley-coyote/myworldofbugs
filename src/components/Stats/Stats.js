import React from "react";
import "./Stats.css";

// Component for the Stats

const Stats = props => (
 <div className="Stats">
   <h3>Current Bugs:</h3>
   {props.children}
 </div>
);

export default Stats;