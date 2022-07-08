const http = require('http');
const https = require('https');
const fs = require("fs");
const unzip  = require('unzipper');

const server = http.createServer((req, res)=>{
  // let matched = req.url.match(/filename=([^&]+)/);
  // let filename = matched && matched[1];
  // console.log('filename', filename);
  // if(!filename){
  //   return
  // }
  // let writeStream = fs.createWriteStream("../server/packages/package");
  if(req.url.match(/^\/auth/)) {
    return auth(req, res)
  }
  if(!req.url.match(/^\/?/)) {
    res.writeHead(404, {
      'Content-Type': 'text/plain'
    });
    res.end("not found")
    return
  }

  const options = {
    hostname: 'api.github.com',
    port: 443,
    path: `/user`,
    method: 'GET',
    headers: {
      Authorization: "token " + req.headers.token,
      "User-Agent": "toy-publish-server"
    }
  }

  const request = https.request(options,(response) => {
    // console.log('statusCode:', res.statusCode);
    // console.log('headers:', res.headers);
    let body = "";
    response.on('data', (d) => {
      body+=d.toString();
    });
    response.on('end', () => {
      console.log("body", body);
      const user = JSON.parse(body);
      console.log(user)
      if(user.message === 'Bad credentials'){
        res.end('Bad credentials');
        return
      }
      // 权限检查
      let writeStream = unzip.Extract({path: "../server/public"})
      req.pipe(writeStream);
      // req.on("data",(trunk) => {
      //   writeStream.write(trunk)
      // })
      // req.on("end",(trunk) => {
      //   writeStream.write(trunk)
      // })
      req.on('end', ()=>{
        res.writeHead(200, {
          'Content-Type': 'text/plain'
        });
        res.end('okay');
      })
    });
  });

  request.on('error', (e) => {
    console.error(e);
  });
  request.end();


  
})

function auth(req, res) {
  let code = req.url.match(/code=([^&]+)/)[1];
  let state = "abc123";
  let client_secret = "1b0f45d231ee97a1a24d83f9d59b9f1d7bfcd9df";
  let client_id = "Iv1.95ba0f4b1984b636";
  let redirect_uri = encodeURIComponent("http://localhost:8081/auth");
  let params = `state=${state}&code=${code}&client_secret=${client_secret}&client_id=${client_id}&redirect_uri=${redirect_uri}`;
  console.log("code", code);

  let url = `https://github.com/login/oauth/access_token?${params}`;
  const options = {
    hostname: 'github.com',
    port: 443,
    path: `/login/oauth/access_token?${params}`,
    method: 'POST'
  }
  const request = https.request(options,(response) => {
    // console.log('statusCode:', res.statusCode);
    // console.log('headers:', res.headers);

    response.on('data', (d) => {
      let result = d.toString().match(/access_token=([^&]+)/);
      if(result) {
        let token = result[1];
        console.log("token", token);
        res.writeHead(200, {
          'access_token': token,
          'Content_Type': 'text/html'
        });
        res.end(`<a href="http://localhost:8080/publish?token=${token}">publish</a>`);
      } else {
        res.writeHead(200, {
          'Content_Type': 'text/plain'
        });
        res.end(d.toString());
      }
    });
  });

  request.on('error', (e) => {
    console.error(e);
  });
  request.end();
  
  // res.writeHead(200, {
  //   'Content-Type': 'text/plain'
  // });
  // res.end('okay');
}

server.listen(8081)