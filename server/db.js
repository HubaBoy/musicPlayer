mysql = require('mysql');

const connection =  mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'SW.r2d2.c3po',
    database: 'musicplayer',
  });

module.exports = connection;