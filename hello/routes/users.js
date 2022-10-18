var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  // get the name from query
  let name = req.query["name"];
  // we send the name back with Hello {name}
  res.send({
    message: `Hello ${name}!`
  });
});

module.exports = router;
