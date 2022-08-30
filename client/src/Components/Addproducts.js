import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './style.css'

const Addproducts = () => {
    const [image, setImage] = useState("")
    const [name, setName] = useState("")
    const [productid, setProductId] = useState("")
    const [price, setPrice] = useState("")
    const history=useNavigate()
        const handleroute=()=>{
            history("/products")

        }

    const handleproductadd = async (e) => {
        
        const data = new FormData()
        data.append("file", image)
        data.append("upload_preset", "instaclone")
        data.append("cloud_name", "aayuag")
        await fetch("https://api.cloudinary.com/v1_1/aayuag/image/upload", {
            method: "post",
            body: data
        })
            .then(res => res.json())
            .then(async (res) => {
                console.log(res.url)

                await fetch("http://localhost:3001/product/add", {
                    method: "post",
                    body: JSON.stringify({
                        price,
                        name,
                        productid,
                        image: res.url
                    }),
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                    .then(res => res.json())
                    .then((data) => {
                        console.log(data)
                           handleroute()
                    })
                    .catch((err) => {
                        console.log(err)
                        handleroute()
                        
                    })
            })
            .catch(err => {
                console.log(err)
            })
    }
    return (
        <>
            <div className='login-page'>
                <div className='login-div'>
                    <h3 className='login-heading'>Please Enter Product Details</h3>
                    <br></br>
                    <input type="file"
                        id="postimage" name="postimage"
                        accept="image/png, image/jpeg" placeholder='Upload Images' onChange={(e) => { setImage(e.target.files[0]) }}></input>
                    <br></br>
                    <input type="text" className='login-input' id='name' name="Name" placeholder='Enter Product Name' onChange={(e) => { setName(e.target.value) }}></input>
                    <br></br>
                    <input type="text" className='login-input' id='price' name="price" placeholder='Enter Product Price' onChange={(e) => { setPrice(e.target.value) }}></input>
                    <br></br>
                    <input type="text" className='login-input' id='productId' name="productId" placeholder='Enter the unique ProductId' onChange={(e) => { setProductId(e.target.value) }}></input>
                    <br></br>
                    <button className='login-submit' onClick={() => handleproductadd()}>Post</button>
                </div>
            </div>
        </>
    )
}

export default Addproducts