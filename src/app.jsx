import React, { Component } from 'react';
import Home from './components/home.jsx';
import Work from './components/work.jsx';
import Contacts from './components/contacts.jsx';
import Navigation from './components/navigation.jsx';
import AOS from 'aos';
import './assets/aos.css';
import MouseAnimation from './components/mouseAnimation';

class App extends Component {
  constructor() {
    super();
    const isMobile = window.matchMedia("only screen and (max-width: 760px)").matches;
    this.state = {
      loading: true,
      isMobile,
    };
  }
  componentDidMount() {
    AOS.init({
      offset: 200,
      duration: 600,
      easing: 'ease-in-sine',
      delay: 100,
      disable: this.state.isMobile,
    });
  }

  render () {
    return (
      <div id="main-container">
        <Home />
        <Work />
        <Contacts />
        <Navigation />
        { this.state.isMobile ? '' : <MouseAnimation /> }
        <div id="bgShadow" />
      </div>
    );
  }
}

export default App;