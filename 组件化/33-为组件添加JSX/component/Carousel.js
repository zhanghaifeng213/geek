import {createElement, Text, Wrapper} from './createElement'
import {Timeline, Animation} from "./animation";
import {ease, linear} from "./cubicBezier"
import "./carousel.css"
// console.log("css", css);

// let style = document.createElement("style");
// style.innerHTML = css[0][1];
// document.documentElement.append(style);

export class Carousel {
  constructor(config) {
    this.root = null;
    this.data = null;
  }

  setAttribute(name, value) {
    this[name] = value;
  }

  render() {
    // this.root = document.createElement("div");
    // this.root.classList.add("carousel");
    // for(let d of this.data) {
    //   let element = document.createElement("img");
    //   element.src = d;
    //   element.enableGesture = true
    //   element.onStart = () => timeline.pause()
    //   element.addEventListener("dragstart", event => event.preventDefault());
    //   this.root.appendChild(element);
    // }

    let position = 0;
    let timeline = new Timeline;
    // window.xtimeline = timeline
    timeline.start();

    let nextPicStopHandler = null

    let children = this.data.map((url, currentPosition) => {
      let lastPosition = (currentPosition - 1 + this.data.length) % this.data.length;
      let nextPosition = (currentPosition + 1) % this.data.length;

      let offset = 0

      let onStart = () => {
        timeline.pause()
        clearTimeout(nextPicStopHandler)

        let currentElement = children[currentPosition]

        let currentTransformValue = Number(currentElement.style.transform.match(/translateX\(([\s\S]+)px\)/)[1])
        offset = currentTransformValue + 500*currentPosition
      }
      let onPan = (event) => {
        let lastElement = children[lastPosition]
        let nextElement = children[nextPosition]
        let currentElement = children[currentPosition]

        let dx = event.clientX - event.startX

        let currentTransformValue = -500 * currentPosition + offset + dx; 
        let lastTransformValue = -500 - 500 * lastPosition + offset + dx;
        let nextTransformValue = 500 - 500 * nextPosition + offset + dx;
        
        currentElement.style.transform = `translateX(${currentTransformValue}px)`;
        lastElement.style.transform = `translateX(${lastTransformValue}px)`;
        nextElement.style.transform = `translateX(${nextTransformValue}px)`;

      }
      let onPanend = event => {
        console.log("event.isFlick", event.isFlick);
        let direction = 0;
        let dx = event.clientX - event.startX
        if(dx + offset > 250 || dx > 0 && event.isFlick) {
          direction = 1
        } else if(dx + offset < -250 || dx < 0 && event.isFlick){
          direction = -1
        }
        timeline.reset()
        timeline.start()

        let current = children[currentPosition];
        let next = children[nextPosition];
        let last = children[lastPosition];

        let currentAnimation = new Animation(current.style, "transform", -500 * currentPosition + offset + dx,-500 * currentPosition + direction*500, 500, 0, ease, v=>`translateX(${v}px)`);

        let nextAnimation = new Animation(next.style, "transform", 500 -500 * nextPosition + offset + dx,500 -500 * nextPosition+direction*500, 500, 0, ease, v=>`translateX(${v}px)`);

        let lastAnimation = new Animation(last.style, "transform", -500 -500 * lastPosition + offset + dx,-500 -500 * lastPosition+direction*500, 500, 0, ease, v=>`translateX(${v}px)`);

        timeline.add(currentAnimation);
        timeline.add(nextAnimation);
        timeline.add(lastAnimation);

        position = (position - direction + this.data.length) % this.data.length

        nextPicStopHandler = setTimeout(nextPic, 3000);
        
      }
      let element = <img src={url} onstart={onStart} onPan={onPan} onPanend={onPanend}  enableGesture={true} />;
      element.style.transform="translateX(0px)";
      element.addEventListener("dragstart", event => event.preventDefault());
      return element;
    })

    let nextPic = () => {
      let nextPosition = (position + 1) % this.data.length;
      let current = children[position];
      let next = children[nextPosition];

      // console.log("current", current.style)

      let currentAnimation = new Animation(current.style, "transform", - 100 * position, -100 - 100 * position, 500, 0, ease, v=>`translateX(${5 * v}px)`);

      let nextAnimation = new Animation(next.style, "transform", 100 - 100 * nextPosition,  - 100 * nextPosition, 500, 0, ease, v=>`translateX(${5 * v}px)`);

      timeline.add(currentAnimation);
      timeline.add(nextAnimation);
      

      // current.style.transition = "ease 0s";
      // next.style.transition = "ease 0s";
      // current.style.transform = `translateX(${- 100 * position}%)`;
      // next.style.transform = `translateX(${100 - 100 * nextPosition}%)`;

      position = nextPosition

      // setTimeout(() => {
        // current.style.transition = "";
        // next.style.transition = "";
        // current.style.transform = `translateX(${-100 - 100 * position}%)`;
        // next.style.transform = `translateX(${ - 100 * nextPosition}%)`;
        // position = nextPosition
      // }, 16);
  
      nextPicStopHandler = setTimeout(nextPic, 3000);
      // window.clearTimeout(window.xstopHandler)
    }

    nextPicStopHandler = setTimeout(nextPic, 3000);
    return <div class="carousel">
      {children}
    </div>
    // this.root.addEventListener("mousedown", event => {
    //   let startX = event.clientX, startY = event.clientY;
    //   let lastPosition = (position - 1 + this.data.length) % this.data.length;
    //   let nextPosition = (position - 1 + this.data.length) % this.data.length;
    //   let current = this.root.childNodes[position];
    //   let last = this.root.childNodes[lastPosition];
    //   let next = this.root.childNodes[nextPosition];

    //   current.style.transition = "ease 0s";
    //   last.style.transition = "ease 0s";
    //   next.style.transition = "ease 0s";

    //   current.style.transform = `translateX(${- 500 * position}px)`;
    //   last.style.transform = `translateX(${ - 500 - 500 * lastPosition}px)`;
    //   next.style.transform = `translateX(${ 500 - 500 * nextPosition}px)`;
      
    //   let move = event => {
    //     current.style.transform = `translateX(${event.clientX - startX - 500 * position}px)`;
    //     last.style.transform = `translateX(${event.clientX - startX - 500 - 500 * lastPosition}px)`;
    //     next.style.transform = `translateX(${event.clientX - startX + 500 - 500 * nextPosition}px)`;
    //   }

    //   let up = event => {
    //     let offset = 0;
    //     if(event.clientX - startX > 250) {
    //       offset = 1;
    //     } else if(event.clientX - startX < -250) {
    //       offset = -1;
    //     }
    //     current.style.transition = "";
    //     last.style.transition = "";
    //     next.style.transition = "";

    //     current.style.transform = `translateX(${offset * 500 - 500 * position}px)`;
    //     last.style.transform = `translateX(${offset * 500 - 500 - 500 * lastPosition}px)`;
    //     next.style.transform = `translateX(${offset * 500 + 500 - 500 * nextPosition}px)`;

    //     position = (position - offset + this.data.length) % this.data.length;

    //     document.removeEventListener("mousemove", move);
    //     document.removeEventListener("mouseup", up);
    //   }
    //   document.addEventListener("mousemove", move);
    //   document.addEventListener("mouseup", up)
    // })
  }

  mountTo(parent) {
    this.render().mountTo(parent)
  }
}