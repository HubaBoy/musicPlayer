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
          <Card key={index} index={index} setSource={setSource} />
        ))}
      </div>
      <div className='bottom-nav'>
        <audio src={source} controls />
      </div>
    </>
  );
}

function Card({ index, setSource }) {
  function handleClick() {
    setSource(songs[index]);
  }

  return (
    <div className='card' onClick={handleClick}>
      <p>jonny</p>
    </div>
  );
}

export default App;
