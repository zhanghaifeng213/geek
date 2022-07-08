// var mod = require("../src/add.js");
var assert = require("assert");

import {add} from "../src/add.js"

it('should add to numbers from an es module',() => {
  assert.equal(add(3,5), 8);
})
// test("foo", t => {
//   if(mod.add(3, 4) === 7)
//     t.pass();
// })
// 00:55:42
// describe('Array',function() {
//   describe('#indexOf()',function() {
//     it('should reture -1 when the value is not present', function() {
//       assert.equal([1,2,3].indexOf(4), -1)
//     })
//   });
// });

// describe('add',function() {
//   it('3+4 should be 7', function() {
//     assert.equal(mod.add(3, 4), 7)
//   })
// });