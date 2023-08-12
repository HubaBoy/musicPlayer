import React, { useState } from 'react';
import './log-in.css';

function LogIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

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
                alert('You logged in successfully');
                setEmail('');
                setPassword('');
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
        </>
    );
}

export default LogIn;
