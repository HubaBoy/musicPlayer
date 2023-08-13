import React, { useState, useEffect } from 'react';
import './log-in.css';
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie';
import styled from 'styled-components'

const StyledLink = styled(Link)`
position: absolute;
align-self: center;
font-size: 3dvh;
margin-left: 10dvw;
margin-top: 3dvh;
/* Add any other custom styles you want to apply to the Link here */
`;

function LogIn({userID ,setUserID}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    useEffect(() => {
        console.log('userID updated:', userID);
      }, [userID]);
      
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('http://localhost:3000/log-in', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password })
            });
            if (response.ok) {
                console.log('You logged in successfully');
                const result = await response.json()
                setUserID(result)
                Cookies.set('userID', result);
                window.location.href = '/';
            } else {
                const errorMessage = await response.text(); 
                alert('Log-in failed: ' + errorMessage);
            }
        } catch (error) {
            console.error('Error logging in:', error);
            alert('Log-in failed: Network error');
        }
    };
  
    return (
        <>
            <div className='log-in-Form'>
                <form onSubmit={handleSubmit}>
                    <h1>Enter your email</h1>
                    <input type='text' name='email' value={email} onChange={(e) => setEmail(e.target.value)} />
                    <h1>Enter your password</h1>
                    <input type='password' value={password} name='password' onChange={(e) => setPassword(e.target.value)} />
                    <button>Log in</button>
                </form>
            </div>
            <StyledLink to='/sing-up'>Don't have account?</StyledLink>
        </>
    );
  }
  

export default LogIn;
