import React, { Component, useEffect } from "react";
import "./App.css";
import "./TriviaStyling.css";
import logo from "./logo.svg";
import lebron from "./lebron.jpg";
import { NavLink, Switch, Route } from "react-router-dom";
import EditProfile from "./EditProfile";
import SoloTrivia from './components/SoloTrivia'
import OnlinePostTrivia from './components/OnlinePostTrivia'
import OnlineChallengeTrivia from './components/OnlineChallengeTrivia'

function App() {
  return (
    <div className="App">
      <header>
        <img src={logo} className="logo" alt="logo" />
        <div class="container">
          <nav>
            <ul>
              <li>
                <NavLink exact activeClassName="current" to="/">
                  Z
                </NavLink>
              </li>
              <li>
                <NavLink exact activeClassName="current" to="/live">
                  LIVE
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      <div class="verbar">
        <div class="profile">
          <h2>
            Welcome, <b>[insert name]</b>
          </h2>
          <p>
            <img src={lebron} className="lebron" alt="lebron" /> ACS: XXX
          </p>
          <p>
            <b>[insert tier]</b>
          </p>
          <hr class="new1"></hr>
        </div>
        <div class="sidebar">
          <ul>
            <li>
              <NavLink exact activeClassName="current" to="/my-account">
                MY ACCOUNT
              </NavLink>
            </li>
            <li>
              <NavLink exact activeClassName="current" to="/open-court">
                OPEN COURT
              </NavLink>
            </li>
            <li>
              <NavLink exact activeClassName="current" to="/trivia">
                TRIVIA
              </NavLink>
            </li>
            <li>
              <NavLink exact activeClassName="current" to="/picks">
                PICKS
              </NavLink>
            </li>
            <li>
              <NavLink exact activeClassName="current" to="/analyze">
                ANALYZE
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
      <Main />
    </div>
  );
}

const Home = () => <div className="home"></div>;

const MyAccount = () => (
  <div className="my-account">
    <EditProfile />
  </div>
);

// ----------------------------- ALL TRIVIA RELATED SECTIONS BELOW -----------------------------
const Trivia = () => (
  <div className='trivia'>
    <h1>Trivia</h1>
    <div className="horizontal-line"></div>
    <h2>Select a mode to play.</h2>
    <p><NavLink exact to='/trivia/solo'>Solos</NavLink></p>
    <p><NavLink exact to='/trivia/online'>Head to Head</NavLink></p>
  </div>
);

const Solo = () => (
  <div className='solo'>
    <h1>Solo Trivia</h1>
    <div className="horizontal-line"></div>
    <div className="solo-info">
      <p>Play a 10 question trivia game to earn ACS points!</p>
      <p>You have 14 seconds to answer each question.</p>
      <p>Correct answers earn 1 ACS point and incorrect answers lose 1 ACS point.</p>
      <p>Good Luck!</p>
    </div>
    <div className="solo-play"><p><NavLink exact to='/trivia/solo/solo-game'>Start!</NavLink></p></div>
    <div className="back"><p><NavLink exact to='/trivia'>back</NavLink></p></div>
  </div>
);

class SoloGame extends Component {
  render() {
    return (
      <div className="TriviaQuestion">
        <h1>Solo Trivia</h1>
        <div className="horizontal-line"></div>
        <SoloTrivia />
      </div>
    )
  }
}

const HeadToHead = () => (
  <div className='head_to_head'>
    <h1>Head to Head Trivia</h1>
    <div className="horizontal-line"></div>
    <div className="online-info">
      <p>Challenge a previous trivia score or post your results for others to play against!</p>
      <p>There are 10 questions each game and you have 10 seconds to answer each one.</p>
      <p>A win earns 2 ACS points, but a loss deducts 2 ACS points.</p>
      <p><br></br>So what's it gonna be?<br></br></p>
      <div className="online-post"><p><NavLink exact to='/trivia/online/online-post'>Post Your Own Score</NavLink></p></div>
      <div className="online-challenge"><p><NavLink exact to='/trivia/online/online-challenge'>Challenge Someone's Score</NavLink></p></div>
      <div className="back"><p><NavLink exact to='/trivia'>back</NavLink></p></div>
    </div>
  </div>
);

class OnlinePost extends Component {
  render() {
    return (
      <div className="OnlinePostQuestions">
        <h1>Online Trivia</h1>
        <div className="horizontal-line"></div>
        <OnlinePostTrivia />
      </div>
    )
  }
}

class OnlineChallenge extends Component {
  render() {
    return (
      <div className="OnlineChallengeTrivia">
        <h1>Online Trivia</h1>
        <div className="horizontal-line"></div>
        <OnlineChallengeTrivia />
      </div>
    )
  }
}

// ------------------------- ALL TRIVIA RELATED SECTIONS END HERE --------------------------------

const Picks = () => <div className="picks"></div>;

const OpenCourt = () => <div className="open-court"></div>;

const Analyze = () => <div className="analyze"></div>;

const Live = () => (
  <div className="live">
    <p>coming soon...</p>
  </div>
);

const Main = () => (
  <Switch>
    <Route exact path="/" component={Home}></Route>
    <Route exact path="/my-account" component={MyAccount}></Route>
    <Route exact path="/open-court" component={OpenCourt}></Route>
    <Route exact path='/trivia' component={Trivia}></Route>
    <Route exact path='/trivia/solo' component={Solo}></Route>
    <Route exact path='/trivia/solo/solo-game' component={SoloGame}></Route>
    <Route exact path='/trivia/online' component={HeadToHead}></Route>
    <Route exact path='/trivia/online/online-post' component={OnlinePost}></Route>
    <Route exact path='/trivia/online/online-challenge' component={OnlineChallenge}></Route>
    <Route exact path="/picks" component={Picks}></Route>
    <Route exact path="/analyze" component={Analyze}></Route>
    <Route exact path="/live" component={Live}></Route>
  </Switch>
);

export default App;
