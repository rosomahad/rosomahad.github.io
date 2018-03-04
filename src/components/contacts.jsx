import React, { Component } from 'react';

class Contacts extends Component {
  render () {
    return (
      <div className="container" data-aos='fade-in' id="contacts">
        <div className="header">
          <p className="title-item">You</p>
          <p className="title-item pre-sub">Can</p>
          <div className="hideBlock">
            <ul className="sub-list">
              <li>fly</li>
              <li>do it</li>
              <li>dance</li>
              <li>smile</li>
            </ul>
          </div>
          <p className="title-item">Find me here</p>
        </div>
        <div className="contacts-list">
          <div className="contact">
            <p className="title">Email</p>
            <p className="text">rosomakha.danil@gmail.com</p>
          </div>
        </div>
      </div>
    );
  }
}

export default Contacts;