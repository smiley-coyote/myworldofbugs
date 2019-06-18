import React from "react";
import "./Home.css";
import Nav from '../../components/Nav';
import Play from '../../components/Play';
import Stats from '../../components/Stats';
import Bug from '../../components/Bug';
import allBugs from '../../bugsfile'

// Component for the Navbar


class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bugsCaught: [],
      bugsAll: allBugs
    }
    this.catchBug = this.catchBug.bind(this);
  }

  // Catching the bug
  catchBug(event){
    const currentBugs = this.state.bugsCaught;
    allBugs[event.target.getAttribute('index')].caught = true
    currentBugs.push({
      name: event.target.getAttribute('name'),
      src: event.target.src,
      id: event.target.id,
      caught: true
    })
    this.setState({
      bugsCaught: currentBugs 
    })
  }


  render(){
    // list of caught bugs
    const bugsList = this.state.bugsCaught.map((item, key)=>
      <li key={item.id}>
        {item.name}
      </li>
    );
    // all remaining bugs left in play area
    const bugsLeft = this.state.bugsAll.map(function(item,index){
    if(!item.caught){
      return <Bug 
      onClick={this.catchBug}
      key={index}
      name={item.name}
      id={item.id}
      alt={item.alt}
      src={item.src}
      caught={item.caught}
      index={index}
      />
    }
  }.bind(this))

    return(
      <div className="Home">
      <Nav />
      <div className="Game">
      <Play>

       {bugsLeft}
    
      </Play>
      <Stats>
        <ul>
        {bugsList}
        </ul>
      </Stats>
      </div>
      
    </div>
    );
  }

};



export default Home;