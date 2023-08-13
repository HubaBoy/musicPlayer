import React, { useState, useEffect } from 'react';
import './sing-up.css';


function SignUp()
{
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [password2, setPassword2] = useState('')
    const [userName, setUserName] = useState('')


    const handleSubmit = async (event) => {
        event.preventDefault();
      
        if (password !== password2) {
          alert('Your passwords do not match');
        } else {
      
          try {
            const response = await fetch('http://localhost:3000/sign-up', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ userName, email, password }),
            });
            
            if (response.ok) {
              const errorMessage = await response.text(); // Get the error message from the response
              alert('Sign-up failed:', errorMessage);
              window.location.href = '/log-in';
            } else {
              const errorMessage = await response.text(); // Get the error message from the response
              console.error('Sign-up failed:', errorMessage);
              alert('Sign-up failed: ' + errorMessage); // Show the specific error message
              console.log(email)
            }
          } catch (error) {
            console.error('Error signing up:', error);
            alert('Sign-up failed: Network error'); // Indicate a network error
            console.log(email)
          }
        }
      };
      
      



  return(
    <div className='bod'>
        <div className='Form'>
            <form onSubmit={handleSubmit} action="/sign-up" method="post">
                <h1>
                    Enter your email
                </h1>
                <input type='text' name='email' value={email} onChange={(e) => setEmail(e.target.value) }></input>
                <h1>
                    Enter your password
                </h1>
                <input type='password' name='password' value={password} onChange={(e) => {setPassword(e.target.value) }}></input>
                <h1>
                    Reenter your password
                </h1>
               {password != password2 && password2!=0 && <p>Your password doenst match</p>}
                <input type='password' name='password2' value={password2} onChange={(e) => {setPassword2(e.target.value) }}></input>
                <h1>
                    Enter your username
                </h1>
                <input type='text' name='userName' value={userName} onChange={(e) => {setUserName(e.target.value) }}></input>
                <button>Sign up</button>
            </form>
        </div>
    </div>
  )
}


export default SignUp
