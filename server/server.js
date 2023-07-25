express = require('express')
app = express();
cors = require('cors');
mysql = require('mysql');
multer = require('multer');

const connection =  mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'SW.r2d2.c3po',
    database: 'musicplayer'
  });

  connection.connect();

app.use(express.urlencoded({ extended: true }));
app.use(cors());

  app.get('/', (req, res) => {
    res.send('hello world');
  });

  app.get('/thumbnail/:id', (req, res) => {
    const query = `SELECT thumbnail from songs where id = ${req.params.id}`
    connection.query(query, (error, results) =>
    {
      if(error)
      {
        console.error(error)
        res.status(500).send('Error retrieving the image');
      }
      else if(results.length === 0)
      {
        res.status(404).send('Thumbnail not found')
      }
      else{
        const data = results[0].thumbnail

        res.set('Content-Type', 'image/jpg');
        res.set('Content-Length', data.length);

        res.send(data);
      }
    })
  })


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
        const songData = results[0].song;
  
        // Set the appropriate response headers
        res.set('Content-Type', 'audio/mpeg');
        res.set('Content-Length', songData.length);
  
        // Send the song data as the response
        res.send(songData);
      }
    });
  });
  
  const audioStorage = multer.memoryStorage();
const audioUpload = multer({ storage: audioStorage });

const imageStorage = multer.memoryStorage();
const imageUpload = multer({ storage: imageStorage });

const title = multer();

app.post('/upload', title.none(), audioUpload.single('audio'), imageUpload.single('image'), (req,res) => {
  const audioFile = req.file
  const imageFile = req.file
  const title = req.body


  const insertQuery = `INSERT INTO songs (title, song, thumbnail) VALUES (?, ?, ?)`;
  const insertValues = [title, audioFile,imageFile];
  connection.query(insertQuery, insertValues, (error, results) => {
    if (error) {
      console.error('Error inserting song:', error);
    } else {
      console.log('Song inserted successfully');
    }
  
    connection.end();
  });

})

  // Start the server
  app.listen(3000, () => {
    console.log('Server is running on port 3000');
  });