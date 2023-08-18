import React from "react";
import {useParams} from 'react-router-dom'

function Delete({userID})
{
 const {id} = useParams()
 console.log(userID)
    if(userID!==id)
  {
    window.location.href = '/log-in';
  }
  if(userID===0)
  {
    window.location.href = '/log-in';
  }


    return(<>
    <p>delete</p>
    </>)
}

export default Delete