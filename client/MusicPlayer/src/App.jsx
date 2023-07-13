import React, { useState } from 'react';
import './App.css';
import songs from './songs';

function App() {
  const [source, setSource] = useState('');

  return (
    <>
      <div className='top-nav'></div>
      <div className='middle-nav'>
        {songs.map((song, index) => (
          <Card key={index} song={song} setSource={setSource} />
        ))}
      </div>
      <div className='bottom-nav'>
        <audio src={source} controls />
      </div>
    </>
  );
}

function Card({ song, setSource }) {
  function handleClick() {
    setSource(song.song);
  }

  return (
    <div className='card' onClick={handleClick}>
      <p>{song.name}</p>
    </div>
  );
}

export default App;
