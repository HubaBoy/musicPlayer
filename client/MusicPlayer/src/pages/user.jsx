import React, {useState, useEffect} from "react";
import {Link, useParams, Outlet} from 'react-router-dom'
import styled from 'styled-components'
import './user.css'
import avatar0 from './avatar.jpg'
import Card from '../components/card.jsx'
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
    const [songs, setSongs] = useState([]);
    const [source, setSource] = useState('0');
    const [thumb, setThumb] = useState('');
    const [title, setTitle] = useState('');
    const [avatarInput, setAvatarInput] = useState(null);
    const [avatar, setAvatar] = useState(null);
    useEffect(()=>{
        fetch(`http://localhost:3000/user/${id}`)
        .then(response => {
            if(!response.ok)
            {
                window.location.href = '/*';
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

    const handleAvatarChange = async (event) => {
        setAvatarInput(event.target.files[0]);
        let input = event.target.files[0];
        console.log(avatarInput);
        
        const formData = new FormData();
        formData.append('avatarInput', input);
        var allowedExtensions =
                    /(\.jpg|\.jpeg|\.png|\.gif)$/i;
        let inputPath = event.target.value;     
            if (!allowedExtensions.exec(inputPath)) {
                alert('Invalid file type');
                fileInput.value = '';
                return false;
            }
            else
            {
        try {
            const result = await fetch(`http://localhost:3000/avatar/${userID}`, {
                method: 'PUT',
                body: formData
            });
            if (result.ok) {
                alert('Upload successful');
                setAvatarInput(null)
            } else {
                alert('Upload failed');
            }
        } catch (error) {
            console.error('Error uploading:', error);
        }
    }};

    useEffect(()=>{
        fetch(`http://localhost:3000/songs/${id}`)
        .then(response =>{
            if(!response.ok)
            {
                throw new Error('Error retrieving the songs')
            }
            return response.json()
        })
        .then(data => {
            setSongs(data);
            console.log(data);
          })
        .catch(error =>{
            console.error(error)
        })
    },[])

    useEffect(()=> {
        fetch(`http://localhost:3000/avatar/${id}`)
            .then(response => {
                if(!response.ok)
                {
                    throw new Error('Error retrieving the avatar')
                }
                return response.blob()
            }).then(data => {
                const dataURL = URL.createObjectURL(data)
                console.log(data)
                setAvatar(dataURL)
            }).catch(error => {
                console.error(error)
            })
    }, [])

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
            <img src={avatar === null ? avatar0 : avatar} alt='avatar'></img>
            {userID === id &&
            <div className='upload-avatar-button'>
                <form method="PUT" encType="multipart/form-data">
                <input type="file" onChange={handleAvatarChange} name="avatar" accept="image/*"></input>
                </form>
            <p>+</p>
             </div>
            }
            <h1>
               {userName}
            </h1>
        </div>
        <div className="user-songs">
            <h2>Songs published by {userName}</h2>
            {songs.map((song,index)=>(
                <Card
                 key={index}
                 song={song}
                 setSource={setSource}
                 setThumb={setThumb}
                 setTitle={setTitle}
                />
            ))}
            {userID === id && 
            <StyledLink to='delete'>
            <div className='delete-button'>
                <p>🗑️</p>
            </div>
            </StyledLink>
            }
        </div>
         <div className='bottom-nav'>
        {thumb !== '' && (
          <div className='show-song'>
            <img src={thumb} alt='thumbnail' />
            <p>{title}</p>
          </div>
        )}
        {source !== '0' && <audio src={source} controls />}
      </div>
    </>
    )
}

export default User;