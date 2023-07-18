express = require('express')
app = express();
cors = require('cors');
mysql = require('mysql');

const connection =  mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'SW.r2d2.c3po',
    database: 'musicplayer'
  });

  const fs = require('fs');

  const songTitle = 'Rap god';
  const songData = fs.readFileSync('./Rap god.mp3'); // Provide the binary data here
  
  // Construct the INSERT statement
  const insertQuery = `INSERT INTO songs (title, song) VALUES (?, ?)`;
  const insertValues = [songTitle, songData];
  
  // Execute the INSERT statement
  connection.query(insertQuery, insertValues, (error, results) => {
    if (error) {
      console.error('Error inserting song:', error);
    } else {
      console.log('Song inserted successfully');
    }
  
    // Close the database connection
    connection.end();
  });

  app.listen(5000);