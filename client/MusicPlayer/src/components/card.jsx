import React, {useState, useEffect} from 'react'
import image from './image.jpg'
import {Link} from 'react-router-dom'
import styled from 'styled-components'
const StyledLink = styled(Link)`
color: green;
position: absolute;
margin-left: 0.6dvw;
margin-top: -0.7dvh;
font-size: 1dvw;
/* Add any other custom styles you want to apply to the Link here */
`;


function Card({ song, setSource, setThumb, setTitle, setdId }) {
    function handleClick() {
      
      if(setdId !== undefined){
        setdId
      }
      else{fetch(`http://localhost:3000/song/${song.id}`)
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
      }}
      setTitle(song.title);
      setdId(song.id)
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
        {song.userName !== undefined && <StyledLink to={`/user/${song.userId}`}>{song.userName}</StyledLink>}
      </div>
    );
  }

  export default Card;