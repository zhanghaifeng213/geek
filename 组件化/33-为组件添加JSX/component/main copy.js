// import "./foo"
// require('./foo.js')
function create(Cls, attributes,...children) {
  let o;
  if(typeof Cls === 'string'){
    o = new Wrapper(Cls)
  } else {
    o = new Cls({
      timer:{}
    });
  }
  for(let name in attributes) {
    // o[name] = attributes[name]
    o.setAttribute(name, attributes[name])
  }
  console.log(children);
  let visit = (children) => {
    for(let child of children) {
      if(typeof child === 'object' && child instanceof Array) {
        visit(child)
        continue
      }
      if(typeof child === 'string') {
        child = new Text(child)
      }
      o.appendChild(child)
    }
  }
  visit(children)
  return o;
  // console.log(arguments);
}
// class Parent {
//   constructor(config) {
//     this.children = []
//     this.root = document.createElement("div");
//   }
//   set class(v) { // property
//     console.log("Parent::class", v);
//   }
//   setAttribute(name, value){ // attribute
//     // console.log(name, value);
//     this.root.setAttribute(name, value)
//   }
//   mountTo(parent) {
//     parent.appendChild(this.root)
//   }
//   appendChild(child) { // children
//     // console.log("Parent::child", child);
//     // this.children.push(child)
//     // this.root.appendChild(child)
//     child.mountTo(this.root)
//   }
// }
class Text {
  constructor(text) {
    this.children = []
    this.root = document.createTextNode(text);
  }
  mountTo(parent) {
    parent.appendChild(this.root)
  }
}
class Wrapper {
  constructor(type) {
    this.children = []
    this.root = document.createElement(type);
  }
  set class(v) { // property
    console.log("Parent::class", v);
  }
  setAttribute(name, value){ // attribute
    // console.log(name, value);
    this.root.setAttribute(name, value)
  }
  mountTo(parent) {
    parent.appendChild(this.root)
    for(let child of this.children) {
      child.mountTo(this.root)
    }
  }
  appendChild(child) { // children
    // console.log("Parent::child", child);
    this.children.push(child)
    // child.mountTo(this.root)
  }
  addEventListener() {
    this.root.addEventListener(...arguments)
  }
  get style() {
    return this.root.style
  }
}
class Div {
  constructor(config) {
    this.children = []
    this.root = document.createElement("div");
  }
  set class(v) { // property
    console.log("Parent::class", v);
  }
  setAttribute(name, value){ // attribute
    // console.log(name, value);
    this.root.setAttribute(name, value)
  }
  mountTo(parent) {
    parent.appendChild(this.root)
    for(let child of this.children) {
      child.mountTo(this.root)
    }
  }
  appendChild(child) { // children
    // console.log("Parent::child", child);
    this.children.push(child)
    // child.mountTo(this.root)
  }
}
let component = <Div id="a" class='b' style="width:100px;height:100px;border:1px solid red;">
  <div>111</div>
  <Div>222</Div>
  <Div></Div>
</Div>

component.class="c"
component.mountTo(document.body)
console.log(component)

// component.setAttribute('id', 'a')
// component.id = 'b'