import {createElement, Text, Wrapper} from './createElement'

export class ListView {
  constructor(config) {
    this.children = [];
    this.attributes = new Map();
    this.properties = new Map();
    this.state = Object.create(null);
    // this.root = null;
    // this.data = null;
  }

  setAttribute(name, value) {
    this[name] = value;
  }

  getAttribute(name) {
    return this[name]
  }

  appendChild(child) {
    this.children.push(child)
  }

  render() {
    let data = this.getAttribute('data')
    return <div class="list-view">
      {
        data.map(this.children[0])
      }
    </div>
  }

  mountTo(parent) {
    this.render().mountTo(parent)
  }
}