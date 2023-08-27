import React, { useState, useEffect } from 'react';
import './App.css';
import {createBrowserRouter,
  createRoutesFromElements,
   Route,
    Link,
     Outlet,
      RouterProvider,
     } from 'react-router-dom'
import SignUp from './pages/sing-up.jsx';
import Cookies from 'js-cookie';
import LogIn from './pages/log-in.jsx';
import Upload from './pages/upload.jsx';
import Home from './pages/home.jsx'
import User from './pages/user.jsx'
import Delete from './pages/delete.jsx'
import Search from './pages/search.jsx'

function App() {
  const [userID, setUserID] = useState(Cookies.get('userID') || 0);
  const router = createBrowserRouter(
    createRoutesFromElements(
      < >
        <Route index element={<Home userID={userID}/>}></Route>
        <Route path='/upload' element={<Upload userID={userID} />}></Route>
        <Route path= 'sing-up' element={<SignUp/>}></Route>
        <Route path= 'log-in' element={<LogIn userID={userID} setUserID={setUserID}/>}></Route>
        <Route path= '/user/:id' element={<User userID={userID}/>}>
        </Route>
        <Route path='/search/:search' element={<Search userID={userID}></Search>}></Route>
        <Route path='/user/:id/delete' element={<Delete userID={userID}></Delete>}></Route>
        <Route path="*" element={<h1>Not found</h1>} />
      </>
    )
  )
return (
  <>
  <RouterProvider router={router}></RouterProvider>
  </>
)
}


export default App
