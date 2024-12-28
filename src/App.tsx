import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import AddProductPage from './pages/createproduct'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Navbar } from './pages/navbar'
import LoginPage from './pages/Login'

import Products from './pages/product'

function App() {
 

  return (
    <BrowserRouter>
    <Navbar/>
    <Routes>  
      <Route path='/add-product' element={<AddProductPage/>}/>
      <Route path='/login' element={<LoginPage/>}/>
      <Route path='/' element={<Products/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
