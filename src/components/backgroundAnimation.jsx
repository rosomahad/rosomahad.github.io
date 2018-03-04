import React, { Component } from 'react';
import '../assets/backgroundAnimation.scss';

class bgAnimation extends Component {
  constructor(props) {
    super();

    const images = this.importAll(require.context('../images/backgrounds', false, /\.(png|jpe?g|svg)$/));

    this.state = {
      images: images,
      direction: 'next',
      currentImage: 0,
    };
  }

  importAll(r = {}) {
    return r.keys().map((item, index) => r(item));
  }
  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll.bind(this));
  }
  handleResize() {
    this.setState({
      windowHeight: document.body.scrollHeight,
    })
  }
  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll.bind(this));
    window.addEventListener('resize', this.handleResize.bind(this));
    this.setState({
      windowHeight: document.body.scrollHeight,
      lastScrollTop: window.pageYOffset || document.documentElement.scrollTop,
    })
  };

  animate() {

  }

  getImage() {
    let {currentImage, currentBgOpacity, nextImage} = this.state;
    const images = this.state.images.map((path, index) => {
      let opacity = 0;
      if(index === currentImage) {
        opacity = this.state.currentBgOpacity;
      } else if(index === nextImage){
        opacity = 1;
      }
      return <img key={path} className="bg-image" src={path} style={{opacity}}/>;
    });
    this.state.currentBgOpacity = currentBgOpacity;
    return images;
  }

  handleScroll() {
    const st = window.pageYOffset || document.documentElement.scrollTop;
    const { lastScrollTop } = this.state;
    let direction;

    if (st > lastScrollTop){
      direction = 'next';
    } else {
      direction = 'prev';
    }

    this.setState({
      direction,
      lastScrollTop: st,
    })
  }

  render () {
    return <div id="background">
      <div id="bg-shadow"/>
      {this.getImage()}
    </div>;
  }
}
export default bgAnimation;