import React, { useState } from 'react';
import './App.css';
import songs from './songs';

function App() {
  const [source, setSource] = useState('0');
  const [thumb, setThumb] = useState(0);
  const [tittle, setTittle] = useState(0);
  return (
    <>
      <div className='top-nav'></div>
      <div className='middle-nav'>
        {songs.map((song, index) => (
          <Card key={index} song={song} setSource={setSource} setThumb={setThumb} setTittle={setTittle} />
        ))}
      </div>
      <div className='bottom-nav'>
        {thumb != 0 ? <div className='show-song'>
          <img src={thumb}></img>
          <p>{tittle}</p>
          </div>: null}
        {source!=0 ? <audio src={source} controls /> : null}
      </div>
    </>
  );
}

function Card({ song, setSource, setThumb, setTittle }) {
  function handleClick() {
    setSource(song.song);
    setThumb(song.image);
    setTittle(song.name);
  }

  return (
    <div className='card' onClick={handleClick}>
     <img src={song.image}></img>
      <p>{song.name}</p>
    </div>
  );
}

export default App;