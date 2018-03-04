import React, { Component } from 'react';
import data from '../data';

class Work extends Component {
  getItem({ src, title, descr }, index) {
    const isMobile = window.matchMedia("only screen and (max-width: 760px)").matches;
    const order = (index % 2 === 0) || isMobile ? 0 : 1;

    return (
      <div
        className="container work"
        data-aos={`${order === 1 ? 'fade-right' : 'fade-left'}`}
        key={index}
        id={`work${index + 1}`}
      >
        <div className="item">
          <figure className="swing" style={{order}}>
            <div className="polaroid">
              <div className="polaroid-img">
                <div className="gloss">
                  <img src={src} alt={title} className="item-img" />
                </div>
              </div>
              <p className="title">{title}</p>
            </div>
          </figure>
          <p className="descr">{descr}</p>
        </div>
      </div>
    )
  }

  render () {
    return data.map((options, index) => this.getItem(options, index));
  }
}

export default Work;