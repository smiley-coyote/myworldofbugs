import React from "react";
import "./Home.css";
import Play from '../../components/Play';
import Stats from '../../components/Stats';
import Bug from '../../components/Bug';
import Results from '../../components/Results';
import AllBugs from '../../bugsfile';
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
      bugsCounter: 5
      // bugClasses: BugClass
    }
    this.catchBug = this.catchBug.bind(this);
    this.getRandomBug = this.getRandomBug.bind(this);
    this.bugRandomClass = this.bugRandomClass.bind(this);
    this.shuffleClasses = this.shuffleClasses.bind(this);
    
  }
  
  componentDidMount(){
    this.getRandomBug();
    this.shuffleClasses(BugClass);
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
  bugRandomClass(randomBugClasses){
    let bugsArr = AllBugs;
    let classesArr = randomBugClasses;
    let bugsArrNew = [];

    for(let i = 0; i<bugsArr.length; i++){
      bugsArr[i].className = classesArr[i]
      bugsArrNew.push(bugsArr[i])
    }
    console.log(bugsArrNew)
    this.setState({
      allBugs: bugsArrNew
    })
  }

  shuffleClasses(bugsArr) {
    let currentIndex = bugsArr.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = bugsArr[currentIndex];
      bugsArr[currentIndex] = bugsArr[randomIndex];
      bugsArr[randomIndex] = temporaryValue;
    }
  
    this.bugRandomClass(bugsArr);
  }

  // Randomizes bugs to catch
  getRandomBug() {
    let availableBugs = AllBugs.filter(bug => !bug.caught);
    let bugCounter = this.state.bugsCounter;
    if(bugCounter > 0){
      let bugIndex = Math.floor(Math.random() * availableBugs.length);
      let nextBug = availableBugs[bugIndex];
      bugCounter--;
      if(bugCounter === 0){
        setTimeout(function(){ alert("you win!"); }, 1000);
        this.setState({
          catchNext: {src: 'checkmark.png', alt: 'checkmark'},
          bugsAll: []
        })
      }else{
        this.setState({
          catchNext: nextBug,
          bugsCounter: bugCounter
        })
      }
    } 
  
  }

  render(){
    // list of caught bugs
    const bugsList = this.state.bugsCaught.map((item, key)=>
      <li key={item.id}>
        <img src={item.src} alt={item.alt} />
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
      <div>
      <Results>
        <h2>Results Page</h2>
      </Results>
      <div className="game">
      <Play>
       {bugsLeft}
      </Play>

      <Stats 
      counter = {this.state.counter}
      catchNext = {this.state.catchNext}
      bugsList = {bugsList}
      />
      </div>
      </div>
      
    );
  }

};



export default Home;