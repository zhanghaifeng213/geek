// console.log("hello, world!");
// phantom.exit();

var page = require("webpage").create();

page.open('http://localhost:8080/', function(status) {
  console.log("status:", status);
  if(status === "success" ) {
    // page.render("./baidu.png")
    var body = page.evaluate(function() {
      var toString = function(pad, element) {
        var children = element.children;
        var childrenString = "";
        for(var i=0;i<element.children.length;i++) {
          childrenString+=toString("    " + pad, element.children[i])+"\n"
        }
        return pad + element.tagName + (childrenString?"\n" + childrenString:'')
      }
      return  toString("", document.body)
    })
    console.log(body);
  }
  phantom.exit();
})