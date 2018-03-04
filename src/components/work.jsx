import React, { Component } from 'react';
import '../assets/work.scss';
import work1 from '../images/backgrounds/bg1.jpeg';
import work2 from '../images/backgrounds/bg2.jpeg';
import work3 from '../images/backgrounds/bg3.jpeg';

const workData = [
  {
    title: 'Photo portfolio',
    src: work1,
    descr: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur eligendi inventore nam obcaecati quas vero.'
  },
  {
    title: 'Coming soon',
    src: work2,
    descr: 'Coming soon'
  },
  {
    title: 'Coming soon',
    src: work3,
    descr: 'Coming soon'
  }
];

class Work extends Component {

  getItem(options, index) {
    const { src, title, descr } = options;
    const order = index % 2 === 0 ? 0 : 1;
    const style = order === 1 ? { right: 0} : {left: 0 };
    return (
    <div className="item" key={index} id={`work${index + 1}`}>
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
      <div className="separator" style={style}/>
    </div>
    )
  }

  getItems() {
    return workData.map((options, index) => this.getItem(options, index))
  }

  render () {

    return (
      <div id="work">
        {
          this.getItems()
        }
      </div>
    );
  }
}

export default Work;