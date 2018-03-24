import React, { Component } from 'react';
import { TweenMax } from 'gsap';

let ctx;

class MouseAnimation extends Component {
  constructor(props) {
    super(props);

    this.getDistance = this.getDistance.bind(this);
    this.mouseMove = this.mouseMove.bind(this);
    this.animate = this.animate.bind(this);
    this.resize = this.resize.bind(this);
    this.init = this.init.bind(this);
    this.state = {
      height: 0,
      width: 0,
      target: {
        x: 0,
        y: 0,
      },
      points: [],
      limit: 3,
      circleSize: 2,
      lineColor: '0, 0, 0',
      circleColor: '0, 0, 0',
    }
  }

  switchEvents(remove = false) {
    if(remove) {
      if (!('ontouchstart' in window)) {
        window.removeEventListener('mousemove', this.mouseMove);
      }
      window.removeEventListener('resize', this.resize);
      window.removeEventListener("resize", this.init);
    } else {
      if (!('ontouchstart' in window)) {
        // Do animation every N mls
        let timingFunc = this.debounce(this.mouseMove, 10);
        window.addEventListener('mousemove', timingFunc);
      }
      window.addEventListener('resize', this.resize);
      window.addEventListener("resize", this.init);
    }
  }

  componentDidMount() {
    this.init();
    this.switchEvents();
  }

  init() {
    const initialData = this.initHeader();
    const points = this.initAnimation(initialData.points);
    this.setState({
      target: initialData.target,
      height: initialData.height,
      width: initialData.width,
      points,
    });
  }

  componentWillUnmount() {
    this.switchEvents(true);
  }

  getDistance(p1, p2) {
    return Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2);
  }

  Circle(pos, rad, color) {
    const that = this;

    // constructor
    (() => {
      that.pos = pos || null;
      that.radius = rad || null;
      that.color = color || null;
    })();

    this.draw = () => {
      if (!that.active) return;
      ctx.beginPath();
      ctx.arc(that.pos.x, that.pos.y, that.radius, 0, 2 * Math.PI, false);
      ctx.fillStyle = `rgba(${that.color},${this.active})`;
      ctx.fill();
    };
  }

  initHeader() {
    let width = window.innerWidth;
    let height = window.innerHeight;

    let canvas = this.refs.animation;
    canvas.width = width;
    canvas.height = height;
    ctx = canvas.getContext('2d');

    // create points
    let points = [];
    for (let x = 0; x < width; x += width / 20) {
      for (let y = 0; y < height; y += height / 20) {
        const px = x + ((Math.random() * width) / 20);
        const py = y + ((Math.random() * height) / 20);
        const p = {
          x: px,
          originX: px,
          y: py,
          originY: py,
        };
        points.push(p);
      }
    }
    const limit = this.state.limit;
    // for each point find the 5 closest points
    for (let i = 0; i < points.length; i += 1) {
      const closest = [];
      const p1 = points[i];
      for (let j = 0; j < points.length; j += 1) {
        const p2 = points[j];
        if (!(p1 === p2)) {
          let placed = false;
          for (let k = 0; k < limit; k += 1) {
            if (!placed) {
              if (closest[k] === undefined) {
                closest[k] = p2;
                placed = true;
              }
            }
          }

          for (let k = 0; k < limit; k += 1) {
            if (!placed) {
              if (this.getDistance(p1, p2) < this.getDistance(p1, closest[k])) {
                closest[k] = p2;
                placed = true;
              }
            }
          }
        }
      }
      p1.closest = closest;
    }

    // assign a circle to each point
    points.forEach((item, i) => {
      points[i].circle = new this.Circle(points[i], 2 + (Math.random() * this.state.circleSize), this.state.circleColor);
    });

    return {
      target: {
        x: width / 2,
        y: height / 2,
      },
      width,
      height,
      points,
    }
  }

  mouseMove(e) {
    let x, y;
    if (e.pageX || e.pageY) {
      x = e.clientX;
      y = e.clientY;
    } else if (e.clientX || e.clientY)    {
      x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
      y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
    }
    this.setState({
      target: {
        x,
        y
      },
    })
  }

  resize() {
    this.setState({
      width: window.innerWidth,
      height: window.innerHeight,
    })
  }

  drawLines(p) {
    if (!p.active) return;
    p.closest.forEach((item, index) => {
      ctx.beginPath();
      ctx.moveTo(p.x, p.y);
      ctx.lineTo(p.closest[index].x, p.closest[index].y);
      ctx.strokeStyle = `rgba(${this.state.lineColor},${p.active})`;
      ctx.stroke();
    });
  }
  debounce(func, wait, immediate) {
    let timeout;
    return function() {
      const context = this, args = arguments;
      const later = function() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      const callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  };

  animate() {
    let { points } = this.state;
    const { target } = this.state;
    ctx.clearRect(0, 0, this.state.width, this.state.height);

    points.forEach((item, i) => {
      // detect points in range
      if(Math.abs(this.getDistance(target, points[i])) < 4000) {
        points[i].active = 0.3;
        points[i].circle.active = 0.6;
      } else if (Math.abs(this.getDistance(target, points[i])) < 20000) {
        points[i].active = 0.1;
        points[i].circle.active = 0.3;
      } else if (Math.abs(this.getDistance(target, points[i])) < 40000) {
        points[i].active = 0.02;
        points[i].circle.active = 0.1;
      } else {
        points[i].active = 0;
        points[i].circle.active = 0;
      }

      this.drawLines(points[i]);
      points[i].circle.draw();
    });
    requestAnimationFrame(this.animate);
  }

  shiftPoint(p) {
    TweenMax.to(p, 1 + Math.random(), {
      x: (p.originX - 50) + (Math.random() * 100),
      y: (p.originY - 50) + (Math.random() * 100),
      onComplete: () => {
        this.shiftPoint(p);
      },
    });
  }

  initAnimation(points) {
    this.animate();
    points.forEach((item, i) => {
      this.shiftPoint(points[i]);
    });
    return points;
  }

  render () {
    return (
      <canvas
        id="mouse-animation"
        height={this.state.height}
        width={this.state.width}
        ref="animation"
      />
    )
  }
}

export default MouseAnimation;