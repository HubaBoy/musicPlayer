import React, {useState, useEffect} from 'react'
import image from './image.jpg'

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

  export default Card;