var express = require('express')
var cors = require('cors')
const mysql = require('mysql2');
require('dotenv').config()

// const connection = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   database: 'workAPICRUD'
// });
const connection = mysql.createConnection(process.env.DATABASE_URL)

var app = express()
app.use(cors())
app.use(express.json())

app.get('/favorite', function (req, res, next) {
    connection.query(
      'SELECT * FROM `favorite`',
      function(err, results, fields) {
        res.json(results);
      }
    );
  })
  
  app.get('/favorite/:no', function (req, res, next) {
    const no = req.params.no;
    connection.query(
      'SELECT * FROM `favorite` WHERE `no` = ?',
      [no],
      function(err, results) {
        res.json(results);
      }
    );
  })

  app.post('/favorite', function (req, res, next) {
    connection.query(
      'INSERT INTO `favorite`(`nct`, `band`, `book`, `song`, `phrase`) VALUES (?, ?, ?, ?, ?)',
      [req.body.nct, req.body.band, req.body.book, req.body.song, req.body.phrase],
      function(err, results) {
        res.json(results);
      }
    );
  })

  app.put('/favorite', function (req, res, next) {
    connection.query(
      'UPDATE `favorite` SET `nct`= ?, `band`= ?, `book`= ?, `song`= ?, `phrase`= ? WHERE no = ?',
      [req.body.nct, req.body.band, req.body.book, req.body.song, req.body.phrase, req.body.no],
      function(err, results) {
        res.json(results);
      }
    );
  })


app.delete('/favorite', function (req, res, next) {
    connection.query(
      'DELETE FROM `favorite` WHERE no = ?',
      [req.body.no],
      function(err, results) {
        res.json(results);
      }
    );
  })

app.listen(5100, function () {
  console.log('CORS-enabled web server listening on port 5100')
})
