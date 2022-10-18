var express = require('express');
var router = express.Router();
var axios = require('axios');

/* GET users listing. */
router.get('/', function(req, res, next) {
  // get the name from query
  let name = req.query["name"];
  // request the message from hello service
  axios.get(`http://localhost:3000/users?name=${name}`).then(result => {
    // return with custom response and give the message
    res.send(`You've greeted with this message: <b>${result.data["message"]}</b>`);
  }).catch(err => {
    // resend the error
    res.send(err);
  })
});

module.exports = router;
