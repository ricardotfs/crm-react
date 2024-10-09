import React from 'react'
import './Navbar.css'

//Components
import { NavLink, Link } from 'react-router-dom';
import { BsHouseDoorFill, BsCameraFill } from 'react-icons/bs'

//Hooks
import { useAuth } from '../../hooks/useAuth';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { logOut, reset } from '../../slice/authSlices';

const Navbar = () => {

  const { auth } = useAuth();
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogou = (e) => {
    e.preventDefault();

    dispatch(logOut());
    dispatch(reset());
    navigate('/login');
  }

  return (

    <header id="navbar">
      <div id="navbar-container" class="boxed">

        <div class="navbar-header">
          <a href="/" class="navbar-brand">
            <img src="../img/logo.png" alt="Nifty Logo" class="brand-icon" />
            <div class="brand-title">
              <span class="brand-text">Nifty</span>
            </div>
          </a>
        </div>
      </div>
    </header>




  )
}

export default Navbar