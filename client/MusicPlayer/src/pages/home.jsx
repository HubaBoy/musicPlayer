import React, { useState, useEffect } from 'react';
import '../App.css';
import styled from 'styled-components'
import {Link} from 'react-router-dom'
import Card from '../components/card.jsx'
import avatar from './avatar.jpg'
const StyledLink = styled(Link)`
text-decoration: none;
/* Add any other custom styles you want to apply to the Link here */
`;

function Home({userID})
{
  const [source, setSource] = useState('0');
  const [thumb, setThumb] = useState('');
  const [title, setTitle] = useState('');
  const [songs, setSongs] = useState([]);

  if(userID===0)
  {
    window.location.href = '/log-in';
  }

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
      <div className='top-nav'>
        <StyledLink to='/upload'>
        <div className='upload-button'>
            <p>+</p>
        </div>
        </StyledLink>
        <Link to={`/user/${userID}`}>
        <img src={avatar}></img>
        </Link>
      </div>
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


export default Home