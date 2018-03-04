import React, { Component } from 'react';
import Scrollchor from 'react-scrollchor';

class Navigation extends Component {
  render() {
    return (
      <div id="navigation">
        <ul id="navbar" className="left-navbar">
          <li className="item"><Scrollchor to="#work1" className="nav-link">I</Scrollchor></li>
          <li className="item"><Scrollchor to="#work2" className="nav-link">II</Scrollchor></li>
          <li className="item"><Scrollchor to="#work3" className="nav-link">III</Scrollchor></li>
        </ul>
        <div id="contacts-bar">
          <Scrollchor to="#contacts" className="nav-link">Contacts</Scrollchor>
        </div>
      </div>
    )
  }
}

export default Navigation;