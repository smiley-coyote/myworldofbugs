import React from "react";
import "./Home.css";
import Nav from '../../components/Nav';
import Play from '../../components/Play';
import Stats from '../../components/Stats';
import Bug from '../../components/Bug';
import AllBugs from '../../bugsfile'
import BugClass from '../../bugsclasses';

// Component for the Navbar


class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bugsCaught: [],
      bugsAll: AllBugs,
      catchNext: {},
      counter: 3,
      // bugClasses: BugClass
    }
    this.catchBug = this.catchBug.bind(this);
    this.getRandomBug = this.getRandomBug.bind(this);
    this.bugRandomClass = this.bugRandomClass.bind(this);
  }
  componentDidMount(){
    this.getRandomBug();
    this.bugRandomClass();
  }
  // Catching the bug

  catchBug(event){
    const currentBugs = this.state.bugsCaught;
    let catchNextId = this.state.catchNext.id;
    let caughtBugId = event.target.id;
    if(catchNextId === caughtBugId){
      AllBugs[event.target.getAttribute('index')].caught = true
      currentBugs.push({
        name: event.target.getAttribute('name'),
        src: event.target.src,
        id: event.target.id,
        className: event.target.className,
        caught: true
      })
      this.setState({
        bugsCaught: currentBugs 
      })
      this.getRandomBug();
    }else {
      let currentCounter = this.state.counter;
      if(currentCounter > 0){
      currentCounter--;
      this.setState({
        counter: currentCounter
      })
      alert('wrong bug!')
    } else{
      alert('you lose!')
    }
    }
  
  }
  // Randomizes bugs class for animations
  bugRandomClass(){
    let bugsArr = AllBugs;
    let classesArr = BugClass;
    let bugsArrNew = [];

    for(let i = 0; i<bugsArr.length; i++){
      bugsArr[i].className = classesArr[i]
      bugsArrNew.push(bugsArr[i])
    }
    this.setState({
      allBugs: bugsArrNew
    })
  }

  // Randomizes bugs to catch
  getRandomBug() {
    let availableBugs = AllBugs.filter(bug => !bug.caught)
    if(availableBugs.length > 0){
      let bugIndex = Math.floor(Math.random() * availableBugs.length);
      let nextBug = availableBugs[bugIndex]
      this.setState({
        catchNext: nextBug
      })
    } else{
      alert('you win!')
    }
  
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
      className={item.className}
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
        <h3>Tries left:</h3>
        <p>{this.state.counter}</p>
        <h3>Catch me!</h3>
        <p>{this.state.catchNext.name}</p>
      <h3>Current Bugs:</h3>
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