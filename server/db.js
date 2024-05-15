mysql = require('mysql');

const connection =  mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'musicplayer',
  });

module.exports = connection;
