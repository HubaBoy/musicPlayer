import React, { useState, useEffect } from 'react';
import './App.css';
import styled from 'styled-components'
import image from './image.jpg'
import {createBrowserRouter,
  createRoutesFromElements,
   Route,
    Link,
     Outlet,
      RouterProvider
     } from 'react-router-dom'
import SignUp from './pages/sing-up.jsx';

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      < >
        <Route index element={<Home />}></Route>
        <Route path='/upload' element={<Upload/>}></Route>
        <Route path= 'sing-up' element={<SignUp/>}></Route>
      </>
    )
  )
return (
  <>
  <RouterProvider router={router}></RouterProvider>
  </>
)
}

const StyledLink = styled(Link)`
text-decoration: none;
/* Add any other custom styles you want to apply to the Link here */
`;

function Home()
{
  const [source, setSource] = useState('0');
  const [thumb, setThumb] = useState('');
  const [title, setTitle] = useState('');
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
      <div className='top-nav'>
        <StyledLink to='/upload'>
        <div className='upload-button'>
            <p>+</p>
        </div>
        </StyledLink>
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


function Upload() {
  const [textInput, setTextInput] = useState('');
  const [songInput, setSongInput] = useState(null);
  const [thumbnailInput, setThumbnailInput] = useState(null);

  const handleTextChange = (event) => {
    setTextInput(event.target.value);
  };

  const handleSongChange = (event) => {
    setSongInput(event.target.files[0]);
  };

  const handleThumbnailChange = (event) => {
    setThumbnailInput(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Perform form data submission
    const formData = new FormData();
    formData.append('textInput', textInput);
    formData.append('songInput', songInput);
    formData.append('thumbnailInput', thumbnailInput);

    try {
      const response = await fetch('http://localhost:3000/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        alert('Upload successful');
        setTextInput('');
        setSongInput(null);
        setThumbnailInput(null);
      } else {
        alert('Upload failed');
      }
    } catch (error) {
      console.error('Error uploading:', error);
    }
  };

  return (
    <>
      <form encType="multipart/form-data" action="/upload" method="post" onSubmit={handleSubmit}>
        <input type="text" name="textInput" value={textInput} onChange={handleTextChange} />
        <input type="file" name="songInput" accept="audio/*" onChange={handleSongChange} />
        <input type="file" name="thumbnailInput" accept="image/*" onChange={handleThumbnailChange} />
        <button type="submit">Submit</button>
      </form>
    </>
  );
}


export default App
