import React, { Component } from 'react';
import '../assets/home.scss';
import Scrollchor from 'react-scrollchor';

class Home extends Component {
  render () {
    return (
      <div id="home">
        <div className="middle">
          <div className="descr-wrapper">
            <p className="descr-title">
              Hey mate!
            </p>
            <p className="descr">
              I'm glad to sea you on my Portfolio!
            </p>
            <p className="home-link-wrap">
              <Scrollchor to="#work1" id="home-link">Click here</Scrollchor>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;