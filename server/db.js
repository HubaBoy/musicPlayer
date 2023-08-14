mysql = require('mysql');

const connection =  mysql.createConnection({
    host: 'localhost',
    user: 'admin',
    password: 'SW.r2d2.c3po',
    database: 'musicplayer',
    port: 3306,
    multipleStatements: true
  });

module.exports = connection;