
import './App.css'
import AddProductPage from './pages/createproduct'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Navbar } from './pages/navbar'
import LoginPage from './pages/Login'

import Products from './pages/product'
import { UpdateProductPage } from './pages/updateproduct'

function App() {
 

  return (
    <BrowserRouter>
    <Navbar/>
    <Routes>  
      <Route path='/add-product' element={<AddProductPage/>}/>
      <Route path='/login' element={<LoginPage/>}/>
      <Route path='/' element={<Products/>}/>
      <Route path='/update-product/:productId' element={<UpdateProductPage/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
