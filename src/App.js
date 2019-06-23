import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Nav from "./components/Nav";
import Home from './pages/Home';
import Start from './pages/Start';
import About from './pages/About';
import NoMatch from './pages/NoMatch';
import './App.css';


const App = () => (
  <Router>
    <div>
      <Nav />
      <div className="mainDiv">
      <Switch>
        <Route exact path="/play" component={Home} />
        <Route exact path="/" component={Start} />
        <Route exact path='/about' component={About} />
        <Route component={NoMatch} />
      </Switch>
      </div>
    </div>
  </Router>
);

export default App;
