const http = require("http");
const querystring = require("querystring");
const fs = require("fs");
const archiver = require("archiver");
const child_process = require("child_process");

// let filename = './1.jpg';
let packname = './dist';
// let packname = './package';

let redirect_uri = encodeURIComponent("http://localhost:8081/auth"); // 虚拟机服务8088 本地8081
child_process.exec(`start https://github.com/login/oauth/authorize?client_id=Iv1.95ba0f4b1984b636&redirect_uri=${redirect_uri}&scope=read%3Auser&state=123abc`);


const server = http.createServer((request, res) => {
  console.log('req.url', request.url);
  let token = request.url.match(/token=([^&]+)/)[1]
  console.log('real publish!!', token);

  const options = {
    host: "localhost",
    port: 8081, 
    path: "/?filename="+"package.zip",
    method: 'POST',
    headers: {
      'token': token,
      "Content-Type": "application/octet-stream",
    }
  }

  const req = http.request(options, (res) => {
    console.log(`STATUS, ${res.sstatusCode}`);
    console.log(`HEADERS, ${JSON.stringify(res.headers)}`);
  });

  req.on('error', (e) => {
    console.log(`problem width request: ${e.message}`);
  });

  const archive = archiver('zip', {
    zlib: {level:9}
  });

  archive.directory(packname, false);

  archive.pipe(fs.createWriteStream("./package.zip"));

  archive.finalize();

  archive.pipe(req);

  archive.on('end', () => {
    console.log("end");
    req.end();
    console.log("publish success!");
    server.close();
  });

});

server.listen(8080)