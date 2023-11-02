import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/authContext';

const Login = () => {
  const [inputs, setInputs] = useState({
    username:"",
    password:""
  });

  const [error, setError] = useState(null);

  
  const { login } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleChange=(e)=>{
    setInputs((prev)=> ({...prev,[e.target.name]:e.target.value}))
  }

  const handleSubmit = async(e)=>{
    e.preventDefault();
    try{
      await login(inputs);
      navigate("/");
    }
    catch(err){
      setError(err.response.data);
    }
  }
  return (
    <div className='auth'>
      <h1>login</h1>
      <form action="">
        <input required type="text" placeholder='enter your username' name='username' onChange={handleChange}/>
        <input required type="password" placeholder='enter your password' onChange={handleChange} name='password'/>
        <button onClick={handleSubmit}>login</button>
        {error && <p>{error}</p>}
        <span>Not Register Yet? <Link to={'/register'}>Register</Link></span>
      </form>
    </div>
  )
}

export default Login
