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
      <h3>Tries left:</h3>
      <p>{this.props.counter}</p>
      <h3>Catch me!</h3>
      <p><img src={this.props.catchNext.src} alt={this.props.catchNext.alt} /></p>
      <h3>Current Bugs:</h3>
      <p>
        {this.props.bugsList}
      </p>
    </div>
    )
  }
}



export default Stats;