var fs = require('fs');

module.exports = {
  port  : 8082,

  dbName  : "english",
  dbHost  : "localhost",
  dbUser  : "devel",
  dbPass  : "",
  dbTime  : "+09:00",

  ssl : {
    key : fs.readFileSync('./ssl/key.pem'),
    cert  : fs.readFileSync('./ssl/cert.pem'),
    passphrase  : "cde3bgt5"
  },

  onair : {
    wait  : "1",
    reservation : "2",
    chat  : "3"
  }

};