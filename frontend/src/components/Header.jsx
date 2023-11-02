import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import Logo from '../img/logo.png'
import { AuthContext } from "../context/authContext";


const Header = () => {
  const { currentUser, logout } = useContext(AuthContext);
  return (
    <div className='navbar'>
      <div className="container">
        <div className="logo">
          <Link to={'/'}>
          <img src={Logo} alt="" />
          </Link>
        </div>
        <div className="links">
          <Link className='link' to={'/?cat=art'}>
            <h5>ART</h5>
          </Link>
          <Link className='link' to={'/?cat=science'}>
            <h5>SCIENCE</h5>
          </Link>
          <Link className='link' to={'/?cat=technology'}>
            <h5>TECHNOLOGY</h5>
          </Link>
          <Link className='link' to={'/?cat=cinema'}>
            <h5>CINEMA</h5>
          </Link>
          <Link className='link' to={'/?cat=design'}>
            <h5>DESIGN</h5>
          </Link>
          <Link className='link' to={'/?cat=food'}>
            <h5>FOOD</h5>
          </Link>
          <span>{currentUser?.username}</span>
          {currentUser ? (
            <span onClick={logout}>Logout</span>
          ) : (
            <Link className="link" to="/login">
              Login
            </Link>
          )}
          <span className='write'>
            <Link className='link' to={'/write'}>write</Link>
          </span>
        </div>
      </div>
    </div>
  )
}

export default Header
