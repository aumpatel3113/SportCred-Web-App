import React from "react";
import "./App.css";
import logo from "./logo.svg";
import lebron from "./lebron.jpg";
import { NavLink, Switch, Route } from "react-router-dom";
import EditProfile from "./EditProfile";

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

const Trivia = () => <div className="trivia"></div>;

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
    <Route exact path="/trivia" component={Trivia}></Route>
    <Route exact path="/picks" component={Picks}></Route>
    <Route exact path="/analyze" component={Analyze}></Route>
    <Route exact path="/live" component={Live}></Route>
  </Switch>
);

export default App;
