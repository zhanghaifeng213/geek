var express = require('express');
var router = express.Router();
const fs = require("fs")

/* GET home page. */
router.post('/', function(request, res, next) {
  console.log('req', request);
  fs.writeFileSync("../server/public/"+request.query.filename, request.body.content)
  // res.render('index', { title: 'Express' });
  res.send('');
  res.end();
});

module.exports = router;
