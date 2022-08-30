import React from 'react'
import './App.css';
import Addproducts from './Components/Addproducts';
import Login from './Components/Login';
import Products from './Components/Products';
import Register from './Components/Register';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import EditProduct from './Components/EditProduct';
import Protected from './Components/Protected';

const App = () => {
  return (
    <>
      <BrowserRouter>
     <Routes>
      <Route path="/add" element={<Protected> <Addproducts/></Protected>}></Route>
      <Route path="/" exact element={<Login/>}></Route>
      <Route path="/products" element={<Protected><Products/></Protected>}></Route>
      <Route path="/register" element={<Register/>}></Route>
      <Route path="/products/edit" element={<Protected><EditProduct/></Protected>}></Route>
     </Routes>
     </BrowserRouter>
    </>
  )
}

export default App