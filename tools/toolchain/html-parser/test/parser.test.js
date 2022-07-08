import { parseHTML } from "../src/parser.js"
let assert = require("assert")

it('parse a single element', ()=>{
  let doc = parseHTML("<div>hello</div>")
  // console.log(doc.children[0].children[0]);
  let div = doc.children[0]
  assert.equal(div.tagName, "div")
  // assert.equal(div.children.length, 0)
  assert.equal(div.type, "element")
  assert.equal(div.attributes.length, 0)
})

it('parse a single element width text content', ()=>{
  let doc = parseHTML("<div>hello</div>")
  let text = doc.children[0].children[0]
  assert.equal(text.content, "hello")
  assert.equal(text.type, "text")
})

it('tag mismatch', ()=>{
  try {
    let doc = parseHTML("<div></ivd>")
  } catch(e) {
    console.log(e.message);
    assert.equal(e.message, "Tag start end doesn't match!")
  }
})

it('text width <', ()=>{
  let doc = parseHTML("<div>a < b</div>");
  let text = doc.children[0].children[0];
  assert.equal(text.content, "a < b")
  assert.equal(text.type, "text")
})

it('width property', ()=>{
  let doc = parseHTML("<div id=a class='cls' data=\"abc\" >a < b</div>");
  let div = doc.children[0];

  let count = 0;
  for(let attr of div.attributes) {
    if(attr.name === "id") {
      count++;
      assert.equal(attr.value, "a");
    }
    if(attr.name === "class") {
      count++;
      assert.equal(attr.value, "cls");
    }
    if(attr.name === "data") {
      count++;
      assert.equal(attr.value, "abc");
    }
  }
  assert.ok(count === 3)
})

it('width property 2', ()=>{
  let doc = parseHTML("<div id=a class='cls' data=\"abc\"></div>")
  let div = doc.children[0];

  let count = 0;
  for(let attr of div.attributes) {
    if(attr.name === "id") {
      count++;
      assert.equal(attr.value, "a");
    }
    if(attr.name === "class") {
      count++;
      assert.equal(attr.value, "cls");
    }
    if(attr.name === "data") {
      count++;
      assert.equal(attr.value, "abc");
    }
  }
  assert.ok(count === 3)
})

it('width property 3', ()=>{
  let doc = parseHTML("<div id=a class='cls' data=\"abc\"/>")
  let div = doc.children[0];

  let count = 0;
  for(let attr of div.attributes) {
    if(attr.name === "id") {
      count++;
      assert.equal(attr.value, "a");
    }
    if(attr.name === "class") {
      count++;
      assert.equal(attr.value, "cls");
    }
    if(attr.name === "data") {
      count++;
      assert.equal(attr.value, "abc");
    }
  }
  assert.ok(count === 3)
})

it('script', ()=>{
  let content = `<div>abcd</div>
  <span>x</span>
  /script>
  <script
  <
  </
  </s
  </sc
  </scr
  </scri
  </scrip
  </script `
  let doc = parseHTML(`<script>${content}</script>`)
  let text = doc.children[0].children[0]
  assert.equal(text.content, content)
  assert.equal(text.type, "text")
})

it('attribute width no value', ()=>{
  let doc = parseHTML("<div class id/>")
  let div = doc.children[0];
})

it('script 2', ()=>{
  let content = `<`
  let doc = parseHTML(`<script>${content}</script>`)
  let text = doc.children[0].children[0]
  assert.equal(text.content, content)
  assert.equal(text.type, "text")
})