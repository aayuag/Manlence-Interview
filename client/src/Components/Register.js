import React from 'react'
import { useState } from "react";
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [name,setName]=useState("")
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")

    const history=useNavigate()
  const handleroute=()=>{
    history("/")
  }
  

    const handleregister=()=>{
        if(name===""){
            alert("Please Enter Your Name")
        }else if(email===""){
            alert("Please Enter Your Email")
        }else if(password===""){
            alert("Please Enter Your Password")
        }else{
            handleserver()
        }
        
    }
    const handleserver=()=>{
        fetch("http://localhost:3001/user/register", {
            method: "post",
            body: JSON.stringify({
                name,
                email,
                password
            }),
            headers: {
                "Content-Type": "application/json"
            }
        }).then((res) => {
            if(res.status===400){
                alert("Already User Exists")
            }else{
                alert("User Successfully Added")
            }         
            handleroute()
        }).catch((err) => {
            console.log(err)
        })
    }
  return (
    <>
    <div className='login-page'>
    <div className='login-div'>
    <h3 className='login-heading'>Please Enter Your Details</h3>
    <br></br>
    <div>
    <input className='login-input' onChange={(e)=>setName(e.target.value)} type="text" placeholder='Enter Your Name'/>
    <br></br>
    <input className='login-input' onChange={(e)=>setEmail(e.target.value)} type="email" placeholder='Enter Your Email'/>
    <br></br>

    <input className='login-input' onChange={(e)=>setPassword(e.target.value)} type="password" placeholder='Enter Your password' ></input>
    <br></br>
    <button className='login-submit' onClick={handleregister}>Submit</button>
    <br></br>
    
    </div>
    
    <p className='login-para' onClick={handleroute}>Already A User? Login</p>
    </div>
    
    </div>
    </>
  )
}

export default Register