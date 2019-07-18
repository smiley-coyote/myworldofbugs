

import React from "react";
import "./Home.css";
import Play from '../../components/Play';
import Stats from '../../components/Stats';
import Bug from '../../components/Bug';
import Results from '../../components/Results';
import AllBugs from '../../bugsfile';
import BugClass from '../../bugsclasses';


const bugIndex = AllBugs;

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      AllBugs,
      bugsCaught: [],
      catchNext: {},
      stamina: 6,
      bugsCounter: 4,
      gameDone: false,
      gameResults: 'Lose'
    }
    this.catchBug = this.catchBug.bind(this);
    this.getRandomBug = this.getRandomBug.bind(this);
    this.bugRandomClass = this.bugRandomClass.bind(this);
    this.shuffleClasses = this.shuffleClasses.bind(this);
    this.refreshGame = this.refreshGame.bind(this);
    this.onAction = this.onAction.bind(this);
    this.resetData = this.resetData.bind(this);
  }

  componentDidMount() {
    console.log(this.state.AllBugs.map(name => name.name))
    this.setGame();
  }

  // Set up game

  setGame(){
    this.setState({
      AllBugs: this.shuffleClasses(),
      catchNext: this.getRandomBug()
    })
  }

  // Catching the bug

  catchBug(event) {
    const {bugsCaught, catchNext} = this.state;
    let caughtBugId = event.target.id;
    if (catchNext.id === caughtBugId) {
      bugIndex[event.target.getAttribute('index')].caught = true
      bugsCaught.push({
        name: event.target.getAttribute('name'),
        image: event.target.getAttribute('image'),
        description: event.target.getAttribute('description'),
        src: event.target.src,
        id: event.target.id,
        className: event.target.className,
        caught: true
      })
      this.setState({
        bugsCaught: bugsCaught,
        catchNext: this.getRandomBug(),
      })
    } else {
        alert('wrong bug!')
    }

  }

  // Clicking the mouse
  onAction() {
    const {stamina} = this.state
    const newStamina = stamina - 1;
    if (newStamina > 0) {
      this.setState({
        stamina: newStamina
      })
    }
    else if (newStamina ===0){
        this.setState({
          gameDone: true
        })
    }
  }

  // Randomizes bugs class for animations
  bugRandomClass(newClasses) {
    const bugsArr = this.state.AllBugs;
    const classesArr = newClasses;
    const bugsArrNew = [];
    for (let i = 0; i < bugsArr.length; i++) {
      bugsArr[i].className = classesArr[i]
      bugsArrNew.push(bugsArr[i])
    }
   return bugsArrNew
  }

  shuffleClasses() {
    const newClasses = BugClass;
    let currentIndex = newClasses.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = newClasses[currentIndex];
      newClasses[currentIndex] = newClasses[randomIndex];
      newClasses[randomIndex] = temporaryValue;
    }

    this.bugRandomClass(newClasses);
  }

  // Randomizes bugs to catch
  getRandomBug() {
    let availableBugs = this.state.AllBugs.filter(bug => !bug.caught);
    const {bugsCounter} = this.state;
    const newBugsCounter = bugsCounter - 1;
    if (newBugsCounter > 0) {
      let bugIndex = Math.floor(Math.random() * availableBugs.length);
      let nextBug = availableBugs[bugIndex];
      this.setState({
        bugsCounter: newBugsCounter
      })
      return nextBug;
    }
    else if (newBugsCounter === 0){
      this.setState({
        gameDone: true,
        gameResults: 'Win'
      })
      return { src: 'checkmark.png', alt: 'checkmark' };
    }

  }

  // reset bugs caught

  resetData = bugs => {
    const resetData = bugs.map(item => ({ ...item, caught: false }));
    return resetData
  }

  // Start game over

  refreshGame(){
    this.setState({
      allBugs: this.resetData(bugIndex),
      bugsCaught: [],
      stamina: 6,
      bugsCounter: 4,
      gameDone: false,
      gameResults: 'Lose'
    })
    this.setGame();
  }

  render() {
    // list of caught bugs
    const bugsList = this.state.bugsCaught.map((item, index) =>
      <li key={item.id}>
        <img src={item.src} alt={item.alt} />
      </li>
    );
    // all remaining bugs left in play area
    const bugsLeft = this.state.AllBugs.map(function (item, index) {
      if (!item.caught) {
        return <Bug
          onClick={this.catchBug}
          key={index}
          name={item.name}
          id={item.id}
          alt={item.alt}
          src={item.src}
          caught={item.caught}
          index={index}
          image={item.image}
          description={item.description}
          className={item.className}
        />
      }
    }.bind(this))
    return (
      <div className="game-window">
        {!this.state.gameDone ? (
            <div className="game">
              <Play onClick={this.onAction}>
                {bugsLeft}
              </Play>

              <Stats
                stamina={this.state.stamina}
                catchNext={this.state.catchNext}
                bugsList={bugsList}
              />
            </div>
        ) : (
            <Results>
              <h1>You {this.state.gameResults}!</h1>
              {this.state.bugsCaught.map(bug =>(
                <div key={bug.id}>
                <h2>{bug.name}</h2>
                <div className="bug-card">
                <p className="bug-image"><img src={bug.image} alt={bug.alt} /></p>
                <p className="bug-description">{bug.description}</p>
                </div>
                </div>
              ))}
              {this.state.bugsCaught.length>0 ?( <button onClick={this.refreshGame}>Release Bugs!</button>):( <button onClick={this.refreshGame}>Play Again!</button>)
              }
             
            </Results>
          )}

      </div>

    );
  }

};



export default Home;