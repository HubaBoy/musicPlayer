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
const { Server } = require('http');

  connection.connect();

  app.use(bodyParser.json()); 
  app.use(bodyParser.urlencoded({ extended: true })); 
  
  app.use(cors({
    origin: '*', 
    methods: 'GET,POST,DELETE, PUT', 
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
        if(thumbnailPath){
          fs.readFile(thumbnailPath, (readError, thumbnailData) => {
            if (readError) {
              console.error(readError);
              res.status(500).send('Error reading thumbnail file');
            } else {
              res.set('Content-Type', 'image/png');
              res.set('Content-Length', thumbnailData.length);
              res.send(thumbnailData);
            }
          });
        }
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
            res.set('Content-Type', 'audio/mp3');
            res.set('Content-Length', songData.length)
            res.send(songData); 
            const stream = fs.createReadStream(songPath)
            stream.on('data', (chunkdata) => {
              res.write(chunkdata);
            });
            stream.on('end', ()=>{
              res.end()

            })
          }
        })
  }})});

  app.get('/username/:id' , (req, res) => {
    const query = `select userName from users where id = ${req.params.id}`
    connection.query(query, (error , results) =>
    {
      if(error)
      {
        res.set(500).send("Error retrieving the user name")
      }else if(results.length === 0)
      {
        res.send(404).send("UserName not found")
     } else{
      res.send(results)
     }
    })
  })

    const storageEngine = multer.diskStorage({
      destination:(req,file, cb) =>{
        if(file.fieldname === 'songInput')
        {
          cb(null, './uploads/songs')
        }else if(file.fieldname === 'thumbnailInput')
        {
          cb(null, './uploads/thumbnails')
        }else if(file.fieldname === 'avatarInput')
        {
          cb(null, './uploads/avatars')
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
  const thumbnailPath = req.files['thumbnailInput'] ? req.files['thumbnailInput'][0].path : null;
  console.log(thumbnailPath);
  const insertQuery = `INSERT INTO songs (title, song, thumbnail, userId , userName) VALUES (?, ?,?,?, ?)`;
  const insertValues = [req.body.textInput ,req.files['songInput'][0].path, thumbnailPath, req.body.userID, req.body.userName];
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
    const checkQueary = `Select * from users where email = '${req.body.email}' `
    connection.query(checkQueary, (error, results) => {
      if(error)
      {
        console.error('Error inserting user:', error);
        res.status(500).send('Error signing up');
      }else if(results.length>0){
        const takenUser = new Error('the email is already taken');
          res.status(409).send(takenUser.message);
      }
      else{
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
    })
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
      }else{
     const user = results;
     res.send(user);
    }})
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
      })
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
      console.error('Error deleting the song:', error);
      res.status(500).send('Error deleting the song');
    } else {
      console.log('User inserted successfully');
      res.status(200).send('Sign-up is successful');
    }
  });
})

app.put('/avatar/:id', upload.fields([{name: "avatarInput", maxCount:1}]), (req, res) => {
    console.log(req.files.path);
     const updateQuery = `update users set avatar= ? where id = ${req.params.id}`
     console.log(updateQuery)
      connection.query(updateQuery, [req.files['avatarInput'][0].path], (error, results)=>{
        if(error)
        {
          res.status(500).send('Internal server error')
        }else {
          console.log('Avatar inserted successfully');
        }
      
      }) 
})

  app.get('/avatar/:id', (req, res) => {
      const selectQuery = `select avatar from users where id = ${req.params.id}`
      connection.query(selectQuery, (error, results)=> {
        if(error)
        {
          res.status(500).send('Error retrieving the avatar')
        }else if(results.length === 0)
        {
          res.status(404).send('Avatar not found')
        } else if(results.length > 0){
          const avatarPath = results[0].avatar;
          console.log(avatarPath)
          {
            fs.readFile(avatarPath, (readError, avatarData) => {
              if(readError)
              {
                res.status(500).send('Error retrieving the avatar')
                console.error(readError)
              }
              else{
                res.set('Content-Type', 'image/jpg')
                res.set('Content-lenght', avatarData.length)
                res.send(avatarData);
              }
            })
          }
        }
      })
  })

  // Start the server
  app.listen(3000, () => {
    console.log('Server is running on port 3000');
  })