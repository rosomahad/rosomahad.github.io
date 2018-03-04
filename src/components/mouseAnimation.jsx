import React, { Component } from 'react';
import { TweenMax } from 'gsap';

let width, height, canvas, ctx, points, target, animateHeader = true;

class MouseAnimation extends Component {
  constructor(props) {
    super(props);

    this.getDistance = this.getDistance.bind(this);
    this.animate = this.animate.bind(this);
    this.resize = this.resize.bind(this);
    this.state = {
      height: 0,
      width: 0,
    }
  }
  componentDidMount() {
    if (!('ontouchstart' in window)) {
      window.addEventListener('mousemove', this.mouseMove);
    }
    window.addEventListener('scroll', this.scrollCheck);
    window.addEventListener('resize', this.resize);

    this.initHeader();
    this.initAnimation();
  }

  componentWillUnmount() {
    if (!('ontouchstart' in window)) {
      window.removeEventListener('mousemove', this.mouseMove);
    }
    window.removeEventListener('scroll', this.scrollCheck);
    window.removeEventListener('resize', this.resize);
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
      ctx.fillStyle = `rgba(156,217,249,${this.active})`;
      ctx.fill();
    };
  }

  initHeader() {
    width = window.innerWidth;
    height = window.innerHeight;
    target = {
      x: width / 2,
      y: height / 2,
    };

    canvas = document.getElementById('mouse-animation');
    canvas.width = width;
    canvas.height = height;
    ctx = canvas.getContext('2d');

    // create points
    points = [];
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

    // for each point find the 5 closest points
    for (let i = 0; i < points.length; i += 1) {
      const closest = [];
      const p1 = points[i];
      for (let j = 0; j < points.length; j += 1) {
        const p2 = points[j];
        if (!(p1 === p2)) {
          let placed = false;
          for (let k = 0; k < 5; k += 1) {
            if (!placed) {
              if (closest[k] === undefined) {
                closest[k] = p2;
                placed = true;
              }
            }
          }

          for (let k = 0; k < 5; k += 1) {
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
      points[i].circle = new this.Circle(points[i], 2 + (Math.random() * 2), 'rgba(255,255,255,0.3)');
    });
  }

  mouseMove(e) {
    if (e.pageX || e.pageY) {
      target.x = e.clientX;
      target.y = e.clientY;
    } else if (e.clientX || e.clientY)    {
      target.x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
      target.y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
    }
  }

  resize() {
    this.setState({
      width: window.innerWidth,
      height: window.innerHeight,
    })
  }

  scrollCheck() {
    animateHeader = !(document.body.scrollTop > height);
  }

  drawLines(p) {
    if (!p.active) return;
    p.closest.forEach((item, index) => {
      ctx.beginPath();
      ctx.moveTo(p.x, p.y);
      ctx.lineTo(p.closest[index].x, p.closest[index].y);
      ctx.strokeStyle = `rgba(156,217,249,${p.active})`;
      ctx.stroke();
    });
  }

  animate() {
    if (animateHeader) {
      ctx.clearRect(0, 0, width, height);
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
    }
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

  initAnimation() {
    this.animate();
    points.forEach((item, i) => {
      this.shiftPoint(points[i]);
    });
  }

  render () {
    return (
      <canvas
        id="mouse-animation"
        height={this.state.height}
        width={this.state.width}
      />
    )
  }
}

export default MouseAnimation;