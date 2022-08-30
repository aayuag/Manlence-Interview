import React, { useState } from 'react'
import EditProduct from './EditProduct'
import "./style.css"
// import {useNavigate} from 'react-router-dom';

const ProductCard = (props) => {
    // console.log(props.element)
    const [edit,setEdit]=useState({})
    const [useedit,SetuseEdit]=useState(false)
    const handledelete=()=>{

    fetch(`http://localhost:3001/product/delete/${props.element.productid}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    }).then((data) => { data.json() }).then((res) => {
      console.log(res)
      alert("Product Successfully Deleted")
      window.location.reload(false);
    }).catch((err) => {
      console.log(err)
    })
    }
    const handleEdit=()=>{
        setEdit(props.element)
        SetuseEdit(true)
        // handleeditroute()
    }
  return (
    <>
        <div className='product-card'>
            <div className='product-image-div'>
                <img className='product-image' src={props.element.image} alt={props.element.name} />
            </div>
            <div>
                <h3 className='product-heading'>{props.element.name}</h3>
                <p>Rs.{props.element.price}</p>

            </div>
            <div className='product-buttons'>
                <button className='product-edit' onClick={handleEdit}>Edit</button>
                <button className='product-delete' onClick={handledelete}>Delete</button>
            </div>
        </div>
        {useedit && <EditProduct element={edit} close={SetuseEdit}/>}
    </>
  )
}

export default ProductCard