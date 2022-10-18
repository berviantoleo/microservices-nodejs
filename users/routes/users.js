var express = require('express');
var router = express.Router();
var axios = require('axios');
var { Pool } = require('pg');

var pool = new Pool();

/* GET users listing. */
router.get('/', async function (req, res, next) {
  // get the name from query
  let name = req.query["name"];
  try {
    // check existing data
    let existing = await pool.query("SELECT COUNT(*) FROM users WHERE name=$1", [name]);
    if (parseInt(existing.rows[0].count) === 0) {
      // insert user data
      let result = await pool.query("INSERT INTO users(name) VALUES($1) RETURNING id", [name]);
      console.log(`Saved with id: ${result.rows[0].id}`);
    }
    // request the message from hello service
    let response = await axios.get(`http://localhost:3000/users?name=${name}`);
    // return with custom response and give the message
    res.send(`You've greeted with this message: <b>${response.data["message"]}</b>`);
  } catch (err) {
    console.error(err);
    res.send(err);
  }
});

// GET by Name
router.get('/byName', async function (req, res, next) {
  // get the name from query
  let name = req.query["name"];
  try {
    // check existing data
    let existing = await pool.query("SELECT * FROM users WHERE name=$1", [name]);
    // return existing
    res.send(existing.rows);
  } catch (err) {
    console.error(err);
    res.send(err);
  }
});

module.exports = router;
