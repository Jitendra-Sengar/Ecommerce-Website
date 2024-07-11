import React from 'react'
import Navbar from "./components/Navbar"
import ProductCard from "./components/ProductCard"
import CartPage from './components/CartPage'
import Banner from "./components/Banner"
import Footer from "./components/Footer"
import {BrowserRouter,Routes,Route} from "react-router-dom"
const App = () => {
  return (
    <BrowserRouter>
    <div>
      <Navbar/>
      <Banner/>
      <Routes>
        <Route exact path="/" element={<ProductCard/>}/>
        <Route path="/cart" element={<CartPage/>}/>
      </Routes>
    </div>
    <Footer/>
    </BrowserRouter>
  )
}

export default App
