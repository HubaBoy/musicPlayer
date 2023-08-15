import React, {useState, useEffect} from "react";
import {Link, useParams} from 'react-router-dom'
import styled from 'styled-components'
import './user.css'
import avatar from './avatar.jpg'
const StyledLink = styled(Link)`
text-decoration: none;
p{
    zoom: 0.7;
}
/* Add any other custom styles you want to apply to the Link here */
`;


function User({userID})
{
    const {id} = useParams();
    const [userName, setUserName] = useState('');

    useEffect(()=>{
        fetch(`http://localhost:3000/user/${id}`)
        .then(response => {
            if(!response.ok)
            {
                throw new Error('Error finding the user')
            }
            return response.json()
        })
        .then(data => {
            setUserName(data[0].userName);
        })
        .catch(error => {
            {
                console.error(error)
            }
        })
    },[])

    return(
        <>
        <div className="top-nav">
        <StyledLink to='/'>
        <div className='upload-button'>
            <p>🏠</p>
        </div>
        </StyledLink>
        </div>
        <div className='user-bar'>
            <img src={avatar}></img>
            {userID === id &&
            <StyledLink>
            <div className='upload-avatar-button'>
            <p>+</p>
             </div>
            </StyledLink>
            }
            <h1>
               {userName}
            </h1>
        </div>
        </>
    )
}

export default User;