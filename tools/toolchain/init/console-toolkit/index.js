const { stdout } = require("ttys");

var stdin = process.stdin;
stdin.setRawMode(true);
stdin.resume();
stdin.setEncoding('utf8');

// stdin.on('data', function(key){
//   if(key === '\u0003'){
//     process.exit()
//   }
//   process.stdout.write(key.toString().charCodeAt(0).toString())
// })

function getChar() {
  return new Promise(resolve => {
    stdin.once('data', function(key){
      resolve(key)
    })
  })
}

function up(n = 1) {
  stdout.write('\033['+n+'A');
}
function down(n = 1) {
  stdout.write('\033['+n+'B');
}
function right(n = 1) {
  stdout.write('\033['+n+'C');
}
function left(n = 1) {
  stdout.write('\033['+n+'D');
}

void async function() {
  stdout.write("which framework do you want to use?\n")
  let answer = await select(["vue","react","angular"])
  stdout.write('You selected ' + answer + "\n")
  process.exit()
  // while(true) {
  //   let char = await getChar();
  //   if(char === "\u0003") {
  //     process.exit();
  //     break;
  //   }
  //   console.log(char.split('').map(c=>c.charCodeAt(0)));
  // }
}()

async function select(choices) {
  let selected = 0;
  for(let i=0;i<choices.length;i++) {
    if(i===selected) {
      stdout.write("[x] " + choices[i] + "\n")
    } else {
      stdout.write("[ ] " + choices[i] + "\n")
    }
  }
  up(choices.length)
  right();
  while(true) {
    let char = await getChar();
    if(char === "\u0003") {
      process.exit();
      break;
    }
    if(char === "w" && selected > 0) {
      stdout.write(" ")
      left()
      selected --;
      up();
      stdout.write("x")
      left()
    }
    if(char === "s" && selected < choices.length - 1) {
      stdout.write(" ")
      left()
      selected ++;
      down();
      stdout.write("x")
      left()
    }
    if(char ==="\r") {
      down(choices.length - selected)
      left()
      return choices[selected]
    }
    // console.log(char.split('').map(c=>c.charCodeAt(0)));
  }
  
}
// 01:30:00

// var tty = require('tty');
// var ttys = require('ttys');
// // var rl = require('readline');

// var stdin = ttys.stdin;
// var stdout = ttys.stdout;

// // stdout.write("hello world!\n");
// // stdout.write("\033[1A");
// // stdout.write("zhf\n");

// const readline = require('readline');

// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout
// });

// // rl.question('What do you think of Node.js? ', (answer) => {
// //   console.log(`Thank you for your valuable feedback: ${answer}`);

// //   rl.close();
// // });

// async function ask(question) {
//   return new Promise((resolve, reject) => {
//     rl.question(question, (answer) => {
//       resolve(answer)
//     });
//   })
// }

// void async function(){
//   console.log(await ask('your project name?'))
// }()