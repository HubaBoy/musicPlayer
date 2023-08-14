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


function User()
{

    useEffect(()=>{
        fetch('http://localhost:3000/user')
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
            <h1>
                Velizar Tsiklovski
            </h1>
        </div>
        </>
    )
}

export default User;