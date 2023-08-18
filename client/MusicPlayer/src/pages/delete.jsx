import React, { useState,useEffect } from "react";
import {useParams,Link} from 'react-router-dom'
import Card from '../components/card'
import styled from 'styled-components'
import './delete.css'
const StyledLink = styled(Link)`
text-decoration: none;
/* Add any other custom styles you want to apply to the Link here */
`;

function Delete({userID})
{
  const [songs, setSongs] = useState([])
 const {id} = useParams()
 const [title, setTitle] = useState('')
 const [dId, setdId] = useState(0);
 console.log(userID)
    if(userID!==id)
  {
    window.location.href = '/log-in';
  }
  if(userID===0)
  {
    window.location.href = '/log-in';
  }
  useEffect(()=>{
    fetch(`http://localhost:3000/songs/${id}`)
    .then( response =>{
      if(!response.ok)
      {
        throw new Error('Error retrieving the songs')

      }
      return response.json()
    })
    .then(data => {
      console.log(data)
      setSongs(data)
    })
    .catch(error => console.error(error))
  }, [])

  const handleNo = () =>{
    setTitle('')
    setdId(0)
  }
  const handleYes= ()=>{
    fetch(`http://localhost:3000/song/${dId}`,
    {
      method: 'DELETE',
    }
    )
    .then(() => {
      window.location.reload(false);
      alert('The song was deleted successfuly')
      console.log(dId)
      setTitle('')
      setdId(0)
    })
    .catch(error => console.log(error))
  }

    return(<>
    <div className="top-nav">
    <StyledLink to='/'>
        <div className='back-to-button'>
            <p>🔙</p>
        </div>
        </StyledLink>
    </div>
    <div className="songs-row">
      {songs.map((song,index)=>(
       <Card
       key={index}
       song={song}
       setdId={setdId}
       setTitle={setTitle}
       />
      ))}
      {dId !== 0 && 
      <div className="confirm-delete">
        <h1>Do you want to delete {title}</h1>  
        <button style={{color: "green"}} onClick={handleYes}>Yes</button>
        <button style={{color: "red"}}  onClick={handleNo}>no</button>
        </div>}
    </div>
    </>)
}

export default Delete