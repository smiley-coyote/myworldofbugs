import React, {Component} from "react";
import "./Stats.css";

// Component for the Stats

class Stats extends Component {
  static defaultProps = {
    catchNext: {
      src: 'checkmark.png',
      alt: 'checkmark'
    }
  }
  render(){
    return (
      <div className="Stats">
      <h3>Stamina left:</h3>
      <p>{this.props.stamina}</p>
      <h3>Catch me!</h3>
      <div className='showcase'><p><img src={this.props.catchNext.src} alt={this.props.catchNext.alt} /></p></div>
      <h3>Current Bugs:</h3>
      <div className="currentBugs">
      <p>
        {this.props.bugsList}
      </p>
      </div>
    </div>
    )
  }
}



export default Stats;