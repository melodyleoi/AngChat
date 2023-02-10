import React from 'react'

import Register from './pages/Register'
import Chat from './pages/Chat'
import Login from './pages/Login'

import { BrowserRouter,  Routes, Route } from 'react-router-dom' 
   
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/Login" element={<Login />}></Route>
        <Route path="/chat" element={<Chat />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
