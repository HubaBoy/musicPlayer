express = require('express')
app = express();
cors = require('cors');
mysql = require('mysql');
multer = require('multer');
const fs = require('fs');



const connection =  mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'SW.r2d2.c3po',
    database: 'musicplayer'
  });

  connection.connect();

app.use(cors());

  app.get('/', (req, res) => {
    res.send('hello world');
  });

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
  const insertQuery = `INSERT INTO songs (title, song, thumbnail) VALUES (?, ?,?)`;
  const insertValues = [req.body.textInput ,req.files['songInput'][0].path, req.files['thumbnailInput'][0].path];
  
  // Execute the INSERT statement
  connection.query(insertQuery, insertValues, (error, results) => {
    if (error) {
      console.error('Error inserting song:', error);
    } else {
      console.log('Song inserted successfully');
    }
  
  res.send('File upload success');
})})


app.get('/song', (req,res ) => {
  const song = fs.readFileSync('./FRIENDS.mp3')
  res.set('Content-Type', 'audio/mpeg');
  res.set('Content-Length', song.length);
  res.send(song)
})

app.post('/sing-up', (req,res) => {

  const insertQuery = `INSERT INTO users (email, Pword, userName) VALUES (?, ?,?)`;
  const insertValues = [req.body.email, req.body.password, req.body.userName];

  connection.query(insertQuery, insertValues, (error, results) => {
    if (error) {
      console.error('Error inserting song:', error);
    } else {
      console.log('Song inserted successfully');
    }

    res.send('Sing-up is successful');

})});

  // Start the server
  app.listen(3000, () => {
    console.log('Server is running on port 3000');
  })