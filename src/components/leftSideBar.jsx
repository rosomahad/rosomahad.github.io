import React, { Component } from 'react';
import Scrollchor from 'react-scrollchor';

class LeftSideBar extends Component {
  render() {
    return (
      <ul id="navbar">
        <li className="item"><Scrollchor to="#work1" className="nav-link">I</Scrollchor></li>
        <li className="item"><Scrollchor to="#work2" className="nav-link">II</Scrollchor></li>
        <li className="item"><Scrollchor to="#work3" className="nav-link">III</Scrollchor></li>
      </ul>
    )
  }
}

export default LeftSideBar;