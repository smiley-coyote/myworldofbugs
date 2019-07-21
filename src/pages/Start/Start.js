import React from "react";
import "./Start.css";
import { Link } from "react-router-dom";

// Start page

class Start extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      style: 'none'
    }
    this.changeStyle = this.changeStyle.bind(this)
  }
  

  changeStyle(){
    let newStyle = 'block'
    this.setState({
      style: newStyle
    })

  }

  render() {
    const displayStyle = this.state.style
    return(
      <div className="Start">
     <img className='cloud cloud1' src='images/cloud.svg' alt='cloud' />
     <img className='cloud cloud2' src='images/cloud.svg' alt='cloud' />
     <img className='cloud cloud3' src='images/cloud.svg' alt='cloud' />
     <img className='cloud cloud4' src='images/cloud.svg' alt='cloud' />
     <img className='cloud cloud5' src='images/cloud.svg' alt='cloud' />
     <img className='cloud cloud6' src='images/cloud.svg' alt='cloud' />
     <div className="start-window">
   <h3>Welcome to My World of Bugs!</h3>
   <div className='start-body'>
     <div className='dropdown'>
     <a href="https://youtu.be/ilQo81iptQg"><img className='spider' src='images/spinyorbweaver2.svg' alt='spiny orb-weaver' /></a>
     </div>
     <div className='start-body-about'>
     <p>A game of catching insects and learning!</p>
     </div>
     <div className='start-body-nav'>
   <Link to='/play'>Start</Link>
   <Link to='/about'>About</Link>
   <div onClick={this.changeStyle} className='howtoplay'>How To Play</div>
   </div>
   <div className='start-body-instructions' style={{display: displayStyle}}>
     <ol>
       <li>Find and catch the correct insect</li>
       <li>Every mouse click costs 1 stamina</li>
       <li>Click on a mushroom to regain stamina</li>
       <li>Catch 5 insects to win, but don't run out of stamina!</li>
     </ol>
   </div>
   </div>
   </div>
   </div>
    )
  }
}

export default Start;