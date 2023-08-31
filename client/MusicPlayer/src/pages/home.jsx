import React, { useState, useEffect } from 'react';
import '../App.css';
import styled from 'styled-components'
import {Link} from 'react-router-dom'
import Card from '../components/card.jsx'
import avatar0 from './avatar.jpg'
const StyledLink = styled(Link)`
text-decoration: none;
/* Add any other custom styles you want to apply to the Link here */
`;
import AudioController from '../components/controller';

function Home({userID})
{
  const [source, setSource] = useState('0');
  const [thumb, setThumb] = useState('');
  const [title, setTitle] = useState('');
  const [songs, setSongs] = useState([]);
  const [avatar, setAvatar] = useState(null);
  const [input, setInput] = useState('')

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

  useEffect(()=> {
    fetch(`http://localhost:3000/avatar/${userID}`)
        .then(response => {
            if(!response.ok)
            {
                throw new Error('Error retrieving the avatar')
            }
            return response.blob()
        }).then(data => {
            const dataURL = URL.createObjectURL(data)
            console.log(data)
            setAvatar(dataURL)
        }).catch(error => {
            console.error(error)
        })
}, [])

const handleChange = (event) => {
  setInput(event.target.value)
  
}

const handleSubmit = (event) => {
  event.preventDefault();
  if(input === '')
  {
      window.location.href = `/`
  }
  else{
  console.log(input)
  window.location.href = `/search/${input}`;
}}

  return (
    <>
      <div className='top-nav'>
        <StyledLink to='/upload'>
        <div className='upload-button'>
            <p>+</p>
        </div>
        </StyledLink>
       <form onSubmit={handleSubmit}>
       <input type='text' onChange={handleChange}></input>
       </form>
        <Link to={`/user/${userID}`}>
        <img src={avatar === null ? avatar0 : avatar} alt='avatar'></img>
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
        {source !== '0' && <AudioController song={source}></AudioController>}
      </div>
    </>
  )
}


export default Home