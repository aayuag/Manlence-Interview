import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Logout from './Logout';
import ProductCard from './ProductCard';
import "./style.css"


const Products = () => {
  const [search,setSearch]=useState("")
  const token = localStorage.getItem("authorization");
  if (token === null) {
    localStorage.setItem("authorization", "")
  } else if (token.length > 0) {
    
  }

  const history=useNavigate()
  const handleroute=()=>{
    history("/add")
  }

  
  const handleFilter = (e) => {
    setSearch(e.target.value)
  }

  const [products,setProducts]=useState([])
  useEffect(()=>{
    fetch("http://localhost:3001/product/all", {
      headers: {
        authorization: token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(...data.orders)
        // setOrderHistory(data.orders);
        setProducts(data)
      });
  },[token])
  // console.log(products)
  return (
    <>
    <div className='background-color'>
    <div className='top-bar'>
    <button className='add-product' onClick={handleroute}>Add Product</button>
        <input type="text" className='search-box' placeholder="Search.." onChange={(e)=>{handleFilter(e)}}></input>
        <Logout/>
    </div>
    <div>
    <div className='products-conatiner'>
{
products.filter((val)=>{
  if(search===""){
    return val
  }else if(val.name.toLowerCase().includes(search.toLowerCase())){
    return val
  }
}).map((item,key)=>{
  return(
    <>
    <ProductCard element={item} key={key}/>
    </>
  )
  
})
}
</div>
    </div>
    </div>
    </>
  )
}

export default Products