import React from 'react'
import { Home } from './Components/Home'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { Signup } from './Components/Signup'
import { Login } from './Components/Login'
import { NotFound } from './Components/NotFound'
import { AddProducts } from './Components/AddProducts'
import { Cart } from './Components/Cart'
import { Fav } from './Components/Fav'
import { Footer } from './Components/Footer'

export const App = () => {
  return (
    <Router>
      
        <Routes>
          <Route exact path="/" element={<Home/>}/>
          <Route path="signup" element={<Signup/>}/>
          <Route path="login" element={<Login/>}/>
          <Route path="addProducts" element={<AddProducts/>}/>
          <Route path="cart" element={<Cart/>}/>
          <Route path="fav" element={<Fav/>}/>
          <Route path="footer" element={<Footer/>}/>
          <Route path="*" element={<NotFound/>}/>
          
        </Routes>
      
    </Router>
   
  )
}

export default App
