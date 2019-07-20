import React from "react";
import "./About.css";
import Nav from '../../components/Nav';

// About page

const About = props => (
  <div className="About">
    <Nav />
    <div className="about-window">
      <div className="about-contents">
        <h2>Background</h2>
        <p>
        For as long as I can remember, I have been fascinated by plants, animals, and insects around me. 
        As a child, I poured over insect fieldguides, spending my free time searching for them outside of my house. 
        At one point, I even wanted to be an entomologist when I grew up.
        </p>
        <p>
        Though I didn't end up becoming an entomologist, I did buy a DSLR camera with a macro lens while in college 
        so that I could take photos of insects close up. 
        Macro pictures of insects are fascinating because they gave us a small glimpse into their world.
        </p>
        <p>
        I received inspiration building this game from the summer months I spent as a child catching and observing bugs
        in my backyard. I hope that you enjoy playing this game as much as I did building it.
        </p>
       <hr />
       <h2>Technology</h2>
        <p>My World of Bugs was created in React with JavaScript, HTML, and CSS. All of the animated insects were created using <a href="https://vectr.com" target="_blank" rel="noopener noreferrer">vectr.com</a>’s free online vector graphics creation tool.</p>
        <div className="about-window-images svg-images">
          <img src='images/spinyorbweaver.svg' alt='spiny orb-weaver spider' />
          <img src='images/butterfly.svg' alt='butterfly' />
          <img src='images/bee.svg' alt='honeybee' />
          <img src='images/gardenorbweaver.svg' alt='garden orb-weaver spider' />
          <img src='images/lubbergrasshopper.svg' alt="lubber grasshopper" />
          <img src='images/dragonfly.svg' alt="dragonfly" />
        </div>
        <p>The pictures of the insects were taken with a Canon T4i DSLR with a macro lens. 
        They were all spotted around my yard in Central Florida.
        </p>
        <div className="about-window-images jpg-images">
        <img src='images/spinyorbweaver.jpg' alt='spiny orb-weaver spider' />
          <img src='images/butterfly.jpg' alt='butterfly' />
          <img src='images/bee.jpg' alt='honeybee' />
          <img src='images/gardenorbweaver.jpg' alt='garden orb-weaver spider' />
          <img src='images/lubbergrasshopper.jpg' alt="lubber grasshopper" />
          <img src='images/dragonfly.jpg' alt="dragonfly" />
        </div>
        <p>To learn more about this project, check its blog post <a href="https://smiley-coyote.github.io/myblog/" target="_blank" rel="noopener noreferrer">here</a>.</p>
      </div>
    </div>
  </div>
);

export default About;