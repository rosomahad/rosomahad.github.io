import React, { Component } from 'react';
import BGAnimation from './components/backgroundAnimation.jsx';
import Home from './components/home.jsx';
import Work from './components/work.jsx';
import Contacts from './components/contacts.jsx';
import LeftSideBar from './components/leftSideBar.jsx';
import Scrollchor from 'react-scrollchor';
import animate from './components/canvas';

class App extends Component {
  constructor() {
    super();
    this.state = {
      loading: true
    };
  }
  componentDidMount() {
    animate();
  }
  render () {
    return (
      <div id="main-container">
        <Home />
        <BGAnimation />
        <Work />
        <Contacts />
        <LeftSideBar />
        <div id="contacts-bar">
          <Scrollchor to="#contacts" className="nav-link">Contacts</Scrollchor>
        </div>
        <canvas id="mouse-animation"/>
      </div>
    );
  }
}

export default App;