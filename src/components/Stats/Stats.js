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
      <div className='stamina'>
      <h3>Stamina</h3>
      <p>{this.props.stamina}</p>
      </div>
      <div className='catch-next'>
      <h3>Catch me!</h3>
      <div className='showcase'>
      <p><img src={this.props.catchNext.src} alt={this.props.catchNext.alt} /></p>
      </div>
      </div>
      <div className="currentBugs">
      <h3>Bugs Caught</h3>
      <p className='jar'>
        {this.props.bugsList}
      </p>
      </div>
    </div>
    )
  }
}



export default Stats;