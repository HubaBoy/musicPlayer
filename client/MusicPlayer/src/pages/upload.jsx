import React, { useState, useEffect } from 'react';

function Upload({userID}) {
    const [textInput, setTextInput] = useState('');
    const [songInput, setSongInput] = useState(null);
    const [thumbnailInput, setThumbnailInput] = useState(null);
    console.log(userID)
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
      formData.append('userID', userID.toString())
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

  export default Upload;