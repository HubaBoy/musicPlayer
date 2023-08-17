express = require('express')
app = express();
cors = require('cors');
mysql = require('mysql');
multer = require('multer');
const fs = require('fs');
const { connect } = require('http2');
bodyParser = require('body-parser')
const connection = require('./db');
const { query } = require('express');

  connection.connect();

  app.use(bodyParser.json()); 
  app.use(bodyParser.urlencoded({ extended: true })); 
  
  app.use(cors({
    origin: '*', 
    methods: 'GET,POST', 
    optionsSuccessStatus: 200, 
    credentials: true, 
  }));

  app.get('/songs', (req, res) => {
    const query = `select id, title from songs;`
    connection.query(query, (error, results) => {
      if(error) {
        console.log(error)
        res.status(500).send('Error retrieving song')
      }
      else if (results.length === 0)
      {
      res.status(404).send('song not found');
      }
     const songs = results;
     res.send(songs);
    })
})


  app.get('/thumbnail/:id', (req, res) => {
    const query = `SELECT thumbnail FROM songs WHERE id = ${req.params.id}`;
    connection.query(query, (error, results) => {
      if (error) {
        console.error(error);
        res.status(500).send('Error retrieving the image');
      } else if (results.length === 0) {
        res.status(404).send('Thumbnail not found');
      } else {
        const thumbnailPath = results[0].thumbnail; 
  
        fs.readFile(thumbnailPath, (readError, thumbnailData) => {
          if (readError) {
            console.error(readError);
            res.status(500).send('Error reading thumbnail file');
          } else {
            res.set('Content-Type', 'image/jpeg');
            res.set('Content-Length', thumbnailData.length);
            res.send(thumbnailData);
          }
        });
      }
    });
  });

  // Create a route to handle the request
  app.get('/song/:id', (req, res) => {
    const query = `SELECT song FROM songs WHERE id = ?`;
    connection.query(query, [req.params.id], (error, results) => {
      if (error) {
        console.error(error);
        res.status(500).send('Error retrieving song');
      } else if (results.length === 0) {
        res.status(404).send('Song not found');
      } else {
        const songPath = results[0].song;
        fs.readFile(songPath, (readError, songData) =>{
          if(readError)
          {
            console.error(readError);
            res.status(500).send('Error retrieving song')
          }
          else{
            res.set('Content-Type', 'audio/mpeg');
            res.set('Content-Length', songData.length)
            res.send(songData);
          }
        })
      }
    });
  });
  
    const storageEngine = multer.diskStorage({
      destination:(req,file, cb) =>{
        if(file.fieldname === 'songInput')
        {
          cb(null, './uploads/songs')
        }else if(file.fieldname === 'thumbnailInput')
        {
          cb(null, './uploads/thumbnails')
        }
        else{
          cb(new Error('Invalid field name'));
        }
      },
      filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + Math.round(Math.random() * 1E9));
      }
    })

    const upload = multer({ storage: storageEngine });

app.post('/upload', upload.fields([{name: "songInput", maxCount:1}, {name: "thumbnailInput", maxCount:1} ]) , (req,res)=>{
  console.log(req.files);
  console.log(req.body.textInput)
  const insertQuery = `INSERT INTO songs (title, song, thumbnail, userId) VALUES (?, ?,?,?)`;
  const insertValues = [req.body.textInput ,req.files['songInput'][0].path, req.files['thumbnailInput'][0].path, req.body.userID];
  console.log(req.body.userID)
  connection.query(insertQuery, insertValues, (error, results) => {
    if (error) {
      console.error('Error inserting song:', error);
    } else {
      console.log('Song inserted successfully');
    }
  
  res.send('File upload success');
})})


  app.post('/sign-up', (req, res) => {
    if (!req.body) {
      return res.status(400).send('Bad Request');
  }
  else{
    const insertQuery = `INSERT INTO users (email, Pword, userName) VALUES (?, ?, ?)`;
    const insertValues = [ req.body.email, req.body.password, req.body.userName];

    connection.query(insertQuery, insertValues, (error, results) => {
      if (error) {
        console.error('Error inserting user:', error);
        res.status(500).send('Error signing up');
      } else {
        console.log('User inserted successfully');
        res.status(200).send('Sign-up is successful');
      }
    });
  }
  });

  app.post('/log-in', (req,res)=>{
    connection.query('select * from users where email = ?', req.body.email, (error, results) => {
      if(error)
      {
        console.error('Error finding a user', error)
        res.status(500).send('Error finding a user')
      }else{
        if(results.length === 0)
        {
          res.send(`User with email ${req.body.email} not found`)
        }else if(results[0].Pword != req.body.password)
        {
          const IncorrectPasword = new Error('Your password does not match');
          console.log(results[0].Pword)
          console.log(req.body.password)
          res.status(401).send(IncorrectPasword.message);
        }
        else{
          const id = results[0].id 
          console.log(id.toString())
          res.send(id.toString())
        }
      }
      
    })
  })

  app.get('/user/:id', (req, res) =>{
    const query = `Select userName from users where id = ${req.params.id}`
    connection.query(query, (error, results)=>{
      if(error)
      {
        console.error(error);
        res.status(500).send('Error finding the user');
      }
      else if (results.length === 0)
      {
      res.status(404).send('song not found');
      }
     const user = results;
     res.send(user);
    })
  })

  app.get('/songs/:user', (req,res) =>{
    const query = `select id,title from songs where userID = ${req.params.user}`
    connection.query(query, (error, results) => {
      if(error)
      {
        console.log(error)
      }else{
        res.send(results)
  }})
  })

  app.delete('/song/:id', (req,res) =>{
    const Tquery = `SELECT thumbnail FROM songs WHERE id = ${req.params.id}`;
    const Squery = `SELECT song FROM songs WHERE id = ${req.params.id}`;
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
   const deleteQuery = `DELETE FROM songs WHERE id = ${req.params.id};`
   connection.query(deleteQuery, (error, results) => {
    if (error) {
      console.error('Error inserting user:', error);
      res.status(500).send('Error signing up');
    } else {
      console.log('User inserted successfully');
      res.status(200).send('Sign-up is successful');
    }
  });
})

  // Start the server
  app.listen(3000, () => {
    console.log('Server is running on port 3000');
  })