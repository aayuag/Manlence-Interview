import React, { useState } from 'react'
import './style.css'

const EditProduct = (props) => {
    
    const [name, setName] = useState("")

    const [price, setPrice] = useState("")
    // console.log(props)
    const handlecancel = () => {
        console.log(props.close)
        props.close(false)
    }
    const handleroute = () => {
        props.close(false)
    }
    const handleproductedit = async (e) => {


        fetch(`http://localhost:3001/product/edit/${props.element.productid}`, {
            method: "post",
            body: JSON.stringify({
                price,
                name,
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .then((data) => {
                console.log(data)
                handleroute()
                window.location.reload(false);
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return (
        <>
            <div className='edit-popup'>
                <div className='edit-popupcontainer'>
                    <input type="text" className='edit-input' id='name' name="Name" placeholder={props.element.name} onChange={(e) => { setName(e.target.value) }}></input>
                    <br></br>
                    <input type="text" className='edit-input' id='price' name="price" placeholder={props.element.price} onChange={(e) => { setPrice(e.target.value) }}></input>
                    <br></br>

                    <button className='productedit-btn' onClick={handleproductedit}>Post</button>
                    <button className='productedit-btn' onClick={handlecancel}>Cancel</button>
                </div>

            </div>
        </>
    )
}

export default EditProduct