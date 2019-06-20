import React from "react";
import "./Bug.css";

// Component for the Bug 

const Bug = props => (
 <img 
 onClick={props.onClick}
 src={props.src} 
 id={props.id}
 name={props.name}
 alt={props.alt}
 index={props.index}
 className={props.className}
 />
);

export default Bug;