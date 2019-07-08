import React from "react";
import "./Home.css";
import Play from '../../components/Play';
import Stats from '../../components/Stats';
import Bug from '../../components/Bug';
import Results from '../../components/Results';
import AllBugs from '../../bugsfile';
import BugClass from '../../bugsclasses';


// Component for the Navbar
const bugIndex = AllBugs;

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      bugsCaught: [],
      bugsAll: [],
      catchNext: {},
      stamina: 6,
      bugsCounter: 5,
      gameDone: false
    }
    this.catchBug = this.catchBug.bind(this);
    this.getRandomBug = this.getRandomBug.bind(this);
    this.bugRandomClass = this.bugRandomClass.bind(this);
    this.shuffleClasses = this.shuffleClasses.bind(this);
    this.refreshGame = this.refreshGame.bind(this);
    this.onMiss = this.onMiss.bind(this);
  }

  componentDidMount() {
    this.setState({
      bugsAll: bugIndex
    })
    this.getRandomBug();
    this.shuffleClasses(BugClass);
    console.log(this.state.gameDone);
  }
  // Catching the bug

  catchBug(event) {
    const currentBugs = this.state.bugsCaught;
    let catchNextId = this.state.catchNext.id;
    let caughtBugId = event.target.id;
    if (catchNextId === caughtBugId) {
      bugIndex[event.target.getAttribute('index')].caught = true
      currentBugs.push({
        name: event.target.getAttribute('name'),
        image: event.target.getAttribute('image'),
        description: event.target.getAttribute('description'),
        src: event.target.src,
        id: event.target.id,
        className: event.target.className,
        caught: true
      })
      this.setState({
        bugsCaught: currentBugs
      })
      
      this.getRandomBug();
    } else {
      let currentStamina = this.state.stamina;
      if (currentStamina > 0) {
        currentStamina--;
        this.setState({
          stamina: currentStamina
        })
        alert('wrong bug!')
      } else {
        alert('you lose!')
      }
    }

  }

  // Missing the bug
  onMiss() {
    let currentStamina = this.state.stamina;
    if (currentStamina > 0) {
      currentStamina--;
      this.setState({
        stamina: currentStamina
      })
      if (currentStamina === 0) {
        alert('you lose')
        this.setState({
          gameDone: true
        })
      }
    }
  }
  // Randomizes bugs class for animations
  bugRandomClass(randomBugClasses) {
    let bugsArr = bugIndex;
    let classesArr = randomBugClasses;
    let bugsArrNew = [];

    for (let i = 0; i < bugsArr.length; i++) {
      bugsArr[i].className = classesArr[i]
      bugsArrNew.push(bugsArr[i])
    }
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
    let availableBugs = bugIndex.filter(bug => !bug.caught);
    let bugCounter = this.state.bugsCounter;
    if (bugCounter > 0) {
      let bugIndex = Math.floor(Math.random() * availableBugs.length);
      let nextBug = availableBugs[bugIndex];
      bugCounter--;
      if (bugCounter === 0) {
        this.setState({
          catchNext: { src: 'checkmark.png', alt: 'checkmark' },
          bugsAll: [],
          gameDone: true
        })
      } else {
        this.setState({
          catchNext: nextBug,
          bugsCounter: bugCounter
        })
      }
    }

  }

  // Start game over

  refreshGame(){
    let allBugs = bugIndex;
    for (let i = 0; i < allBugs.length; i++) {
      allBugs[i].caught = false;
    }
    this.setState({
      bugsCaught: [],
      bugsAll: allBugs,
      catchNext: {},
      stamina: 6,
      bugsCounter: 5,
      gameDone: false
    })
    this.getRandomBug();
    this.shuffleClasses(BugClass);
    console.log(this.state.gameDone);
  }

  render() {
    // list of caught bugs
    const bugsList = this.state.bugsCaught.map((item, key) =>
      <li key={item.id}>
        <img src={item.src} alt={item.alt} />
      </li>
    );
    // all remaining bugs left in play area
    const bugsLeft = this.state.bugsAll.map(function (item, index) {
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
              <Play onClick={this.onMiss}>
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