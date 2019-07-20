import React from "react";
import "./Home.css";
import Play from '../../components/Play';
import Stats from '../../components/Stats';
import Bug from '../../components/Bug';
import Results from '../../components/Results';
import AllBugs from '../../bugsfile';
import BugClass from '../../bugsclasses';
import Nav from "../../components/Nav";

// Component for the Navbar
const bugIndex = AllBugs;


class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      bugsCaught: [],
      bugsAll: bugIndex,
      catchNext: {},
      stamina: 4,
      bugsCounter: 3,
      gameDone: false,
      gameResults: 'Your results',
      tips: '',
      tipsStyle: ''
    }
    this.catchBug = this.catchBug.bind(this);
    this.getRandomBug = this.getRandomBug.bind(this);
    this.bugRandomClass = this.bugRandomClass.bind(this);
    this.shuffleClasses = this.shuffleClasses.bind(this);
    this.refreshGame = this.refreshGame.bind(this);
    this.onAction = this.onAction.bind(this);
    this.gameWin = this.gameWin.bind(this);
    this.gameLose = this.gameLose.bind(this);
    this.checkGame = this.checkGame.bind(this);
    this.powerUp = this.powerUp.bind(this);
    this.runTips = this.runTips.bind(this);
  }

  componentDidMount() {
    this.shuffleClasses(BugClass);
    this.setState({
      catchNext: this.getRandomBug()
    })
  }

  // checking current game conditions

  checkGame(){
    const {bugsCounter, gameDone, catchNext} = this.state;
    if(gameDone){
      this.setState({
        bugsCaught: [],
        catchNext: this.getRandomBug(),
        stamina: 4,
        bugsCounter: 3,
        gameDone: false,
        tips: '',
        tipsStyle: ''
      })
    }else {
      if(bugsCounter > 0 && catchNext.clicked){
        this.setState({
          catchNext: this.getRandomBug()
        })
      }
      else if(bugsCounter === 0){
        this.gameWin();
      }
    }
    
  }

  // powerup 

  powerUp(){
    this.setState({
      stamina: 4
    })
  }

    // game Win

    gameWin(){
      this.setState({
        gameResults: 'You Win!',
        gameDone: true
      })
    }

  // game Lose

  gameLose(){
    this.setState({
      gameResults: 'You ran out of stamina!',
      gameDone: true
    })
  }

  // run tips

  runTips(){
   const {catchNext} = this.state
 
    this.setState({
      tips: 'Catch the ' + catchNext.name + '!'
    })
  }


  // Catching the bug

  catchBug(event) {
    const {bugsCaught, catchNext, bugsCounter} = this.state;
    const currentBugs = bugsCaught;
    const newCounter = bugsCounter - 1;
    let caughtBugId = event.target.id;
    if(caughtBugId==='powerup'){
      bugIndex[event.target.getAttribute('index')].caught = true
      setTimeout(this.powerUp, 50)
      this.setState({
        tips: 'You got a powerup!',
        tipsStyle: 'swell'
      })
      setTimeout(this.runTips, 3000)
    }
    else if (catchNext.id === caughtBugId) {
      catchNext.clicked = true;
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
        bugsCaught: currentBugs,
        bugsCounter: newCounter,
        catchNext: catchNext,
        tips: ''
      })
     setTimeout(this.checkGame, 0)
    } else {
      this.setState({
        tips: 'Wrong bug!',
        tipsStyle: 'swell'
      })
      setTimeout(this.runTips, 3000)
    }

  }

  // Clicking anywhere 
  onAction() {
    const {stamina, bugsCounter} = this.state;
    const newStamina = stamina - 1;
    if(newStamina === 0 && bugsCounter > 0){
      this.setState({
        stamina: newStamina
      })
      setTimeout(this.gameLose, 1)
    }else{
      this.setState({
        stamina: newStamina
      })
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
    let availableBugs = bugIndex.filter(bug => !bug.caught && bug.type==='insect');
    let newIndex = Math.floor(Math.random() * availableBugs.length);
    let nextBug = availableBugs[newIndex];
    nextBug.clicked = false;
   setTimeout(this.runTips, 3000);
    return nextBug;

  }

  // Start game over

  refreshGame(){
    let allBugs = bugIndex;
    for (let i = 0; i < allBugs.length; i++) {
      allBugs[i].caught = false;
    }
    this.setState({
      allBugs: allBugs
    })
    this.shuffleClasses(BugClass);
    this.checkGame();
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
          type={item.type}
        />
      }
    }.bind(this))
    return (
      <div>
      <Nav />
      <div className="game-window">
        {!this.state.gameDone ? (
            <div className="game">
              <Play onClick={this.onAction}>
              <div className="tips" ><p>{this.state.tips}</p></div>
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
              <h1>{this.state.gameResults}</h1>
              <h4>Your Collection:</h4>
              {this.state.bugsCaught.map(bug =>(
                <div key={bug.id}>
                <h2>{bug.name}</h2>
                <div className="bug-card">
                <p className="bug-image"><img src={bug.image} alt={bug.alt} /></p>
                <p className="bug-description">{bug.description}</p>
                </div>
                </div>
              ))}
             <button onClick={this.refreshGame}>Release Bugs!</button>
             
            </Results>
          )}

      </div>
</div>
    );
  }

};



export default Home;