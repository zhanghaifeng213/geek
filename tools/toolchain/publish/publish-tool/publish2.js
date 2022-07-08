const http = require("http");
const querystring = require("querystring");
const fs = require("fs");
const archiver = require("archiver");
const child_process = require("child_process");

// let filename = './1.jpg';
let packname = './package';

// fs.stat(filename, (error, stat) => {
  // console.log('stat', stat);
  const options = {
    host: "localhost",
    port: 8081,
    path: "/?filename="+"package.zip",
    method: 'POST',
    headers: {
      "Content-Type": "application/octet-stream",
      // "Content-Length": 0
      // "Content-Length": stat.size
      // "Content-Length": Buffer.byteLength(postData)
    }
  }

  const archive = archiver('zip', {
    zlib: {level:9}
  });

  archive.directory(packname, false);

  archive.pipe(fs.createWriteStream("./package.zip"));
  // http%3A%2F%2Flocalhost%3A8080

  archive.on('end', () => {
    console.log("end");
    req.end();
    let redirect_uri = encodeURIComponent("http://localhost:8081/auth");
    child_process.exec(`start https://github.com/login/oauth/authorize?client_id=Iv1.95ba0f4b1984b636&redirect_uri=${redirect_uri}&scope=read%3Auser&state=123abc`)
  });

  archive.finalize();

  // const postData = querystring.stringify({
  //   "content": "hello world!234"
  // })
  
  // const postData = "hello world!234"
  
  
  
  const req = http.request(options, (res) => {
    console.log(`STATUS, ${res.sstatusCode}`);
    console.log(`HEADERS, ${JSON.stringify(res.headers)}`);
    // res.setEncoding('utf8');
    // res.on('data', (chunk) => {
    //   console.log(`BODY，${chunk}`);
    // })
    // res.on('end', (chunk) => {
    //   console.log(`No more data in response.`);
    // })
  });

  archive.pipe(req);
  
  req.on('error', (e) => {
    console.log(`problem width request: ${e.message}`);
  });

  
  
  // let readStream = fs.createReadStream("./"+filename);
  // readStream.pipe(req)
  // readStream.on('end', () => {
  //   req.end();
  // })
  // req.write(postData);
  // req.end();
// })

