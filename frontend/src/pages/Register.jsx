import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios"

const Register = () => {
  const [inputs, setInputs] = useState({
    username:"",
    email:"",
    password:""
  });

  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleChange=(e)=>{
    setInputs((prev)=> ({...prev,[e.target.name]:e.target.value}))
  }

  const handleSubmit = async(e)=>{
    e.preventDefault();
    try{
      await axios.post("/auth/register",inputs);
      navigate("/login")
    }
    catch(err){
      setError(err.response.data);
    }
  }


  return (
    <div className='auth'>
      <h1>Register</h1>
      <form action="">
        <input required name='username' type="text" placeholder='enter your username'  onChange={handleChange}/>
        <input required name='email' type="email" placeholder='enter your email' onChange={handleChange}/>
        <input required name='password' type="password" placeholder='enter your password' onChange={handleChange}/>
        <button onClick={handleSubmit}>register</button>
        {error && <p>{error.message}</p>}
        <span>Already Register ? <Link to={'/login'}>login</Link></span>
      </form>
    </div>
  )
}

export default Register
