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
 image={props.image}
 description={props.description}
 className={props.className}
 />
);

export default Bug;