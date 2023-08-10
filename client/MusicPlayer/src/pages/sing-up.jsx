import React, { useState, useEffect } from 'react';
import './sing-up.css';


function SignUp()
{
    const [email, setEmail] = useState(0)
    const [password, setPassord] = useState(0)
    const [password2, setPassord2] = useState(0)
    const [userName, setUserName] = useState(0)

  return(
    <div className='body'>
        <div className='Form'>
            <form>
                <h1>
                    Enter your email
                </h1>
                <input type='text' name='Email' onChange={(e) => setEmail(e.target.value) }></input>
                <h1>
                    Enter your password
                </h1>
                <input type='text' name='password' onChange={(e) => {setPassord(e.target.value) }}></input>
                <h1>
                    Reenter your password
                </h1>
               {password != password2 && password2!=0 && <p>Your password doenst match</p>}
                <input type='text' name='password2' onChange={(e) => {setPassord2(e.target.value) }}></input>
                <h1>
                    Enter your username
                </h1>
                <input type='text' name='username' onChange={(e) => {setUserName(e.target.value) }}></input>
                <button>Sign up</button>
            </form>
        </div>
    </div>
  )
}


export default SignUp
