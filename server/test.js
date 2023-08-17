mysql = require('mysql');
multer = require('multer');
const fs = require('fs');
const connection = require('./db');

const Tquery = `SELECT thumbnail FROM songs WHERE id = 16`;
    const Squery = `SELECT song FROM songs WHERE id = 16`;
    connection.query(Tquery, (error, results) => {
      if (error) {
        console.error(error);
        res.status(500).send('Error retrieving the image path');
      } else {
        fs.unlink( results[0].thumbnail, (err) => {
          if (err) {
              throw err;
          }
          console.log("Delete thumbnail successfully.");
      });
      }
  })
  connection.query(Squery, (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).send('Error retrieving the song path');
    } else {
      fs.unlink( results[0].song, (err) => {
        if (err) {
            throw err;
        }
        console.log("Delete song successfully.");
    });
    }
})
   const deleteQuery = `DELETE FROM songs WHERE id = 16;`
   connection.query(deleteQuery, (error, results) => {
    if (error) {
      console.error('Error inserting user:', error);
      res.status(500).send('Error signing up');
    } else {
      console.log('User inserted successfully');
      res.status(200).send('Sign-up is successful');
    }
  });