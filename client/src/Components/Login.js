import React, { useState } from 'react'
import axios from 'axios'
import './style.css'
import {useNavigate} from 'react-router-dom';

const Login = () => {
  const history=useNavigate()
  const handleroute=()=>{
    history("/products")
  }
  const handleregister=()=>{
    history("/register")
  }
  const [login, setLogin] = useState({user: "", password: ""})
    const handlelogin = (e)=> {
        axios({
            url: "http://localhost:3001/user/login",
            method: "POST",
            headers: {
            },
            data: login
        }).then((loginData)=> {
          
          localStorage.setItem("authorization", loginData.data.authToken);
          handleroute()
          console.log(loginData)
           
            // handleclicklogin()
        }).catch((err)=> {
            alert(err.response.data)
            
        })
    }
  return (
    <>
    <div className='login-page'>
    <div className='login-div'>
    <h3 className='login-heading'>Please Enter Your Login Details</h3>
    <br></br>
    <div>
    <input className='login-input' type="email" placeholder='Enter Your Email' onChange={(e)=> {setLogin({...login, email: e.target.value})}}/>
    <br></br>
    <input className='login-input' type="password" placeholder='Enter Your password' onChange={(e)=> {setLogin({...login, password: e.target.value})}} ></input>
    <br></br>
    <button className='login-submit' onClick={handlelogin} >Submit</button>
    <br></br>
    
    </div>
    
    <p className='login-para' onClick={handleregister}>Not a user? Register</p>
    </div>
    
    </div>
    </>
  )
}

export default Login