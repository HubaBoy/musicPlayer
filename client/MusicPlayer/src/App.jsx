import React, { useState, useEffect } from 'react';
import './App.css';
import image from './image.jpg'

function App() {
  
  return(
    <Home />
  )
  ;
}

function Home()
{
  const [source, setSource] = useState('0');
  const [thumb, setThumb] = useState('');
  const [title, setTitle] = useState('');
  const [p, setP] = useState('');
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/songs')
      .then(response => {
        if (!response.ok) {
          throw new Error('Error retrieving songs');
        }
        return response.json();
      })
      .then(data => {
        setSongs(data);
        console.log(data);
      })
      .catch(error => console.log(error));
  }, []);

  return (
    <>
      <div className='top-nav'></div>
      <div className='middle-nav'>
        {songs.map((song, index) => (
          <Card
            key={index}
            song={song}
            setSource={setSource}
            setThumb={setThumb}
            setTitle={setTitle}
          />
        ))}
      </div>
      <div className='bottom-nav'>
        {thumb !== '' && (
          <div className='show-song'>
            <img src={thumb} alt='thumbnail' />
            <p>{title}</p>
          </div>
        )}
        {source !== '0' && <audio src={source} controls />}
      </div>
    </>
  )
}


function Card({ song, setSource, setThumb, setTitle }) {
  function handleClick() {
    fetch(`http://localhost:3000/song/${song.id}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Error retrieving song');
      }
      return response.blob();
    })
    .then(data => {
      const dataUrl = URL.createObjectURL(data);
      setSource(dataUrl);
      console.log(data);
    })
    .catch(error => console.log(error));
    if(thumbnail == null)
    {
      setThumb(image)
    }
    else{
      setThumb(thumbnail);
    }
    setTitle(song.title);
  }

  const [thumbnail, setThumbnail] = useState(null);
  useEffect(() => {
  fetch(`http://localhost:3000/thumbnail/${song.id}`)
  .then( results => {
    if(!results.ok)
    {throw new Error('Error retrieving the thumbnail')}
    return results.blob()
  }
  )
  .then(
    data => {
      const dataURL = URL.createObjectURL(data)
      setThumbnail(dataURL);
    }
  )
  .catch(error =>
    {
      console.error(error);
    })
}, [])

  return (
    <div className='card' onClick={handleClick}>
      <img src={thumbnail !== null ? thumbnail : image} alt='thumbnail' />
      <p>{song.title}</p>
    </div>
  );
}


export default App;
