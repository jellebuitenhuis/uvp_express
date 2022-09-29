var express = require('express');
var router = express.Router();
var fs = require('fs');

router.post('/', function(req, res, next) {
  console.log(req.headers)
  let xml = req.body;
  console.log(xml);

  fs.writeFile('test.xml', xml, function(err) {
    if (err) {
      console.log(err);
    } else {
      console.log('The file was saved!');
    }
  });
  res.send(req.body);
});

module.exports = router;
