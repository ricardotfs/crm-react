import React from 'react'
import './Navbar.css'

//Components
import {NavLink,Link} from 'react-router-dom';
import {BsHouseDoorFill, BsCameraFill} from 'react-icons/bs'

//Hooks
import { useAuth } from '../../hooks/useAuth';
import {useDispatch,useSelector} from 'react-redux'
import { useNavigate } from 'react-router-dom';
import {logOut,reset} from '../../slice/authSlices';

const Navbar = () => {

  const {auth} = useAuth();
  const {user} = useSelector((state)=> state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogou = (e)=> {
    e.preventDefault();

    dispatch(logOut());
    dispatch(reset());
    navigate('/login');  
  }

  return (
    <nav id='nav'>
        <Link to='/'>Crm react</Link>
        <ul id='nav-link'>
            { auth ? (
                <>
                    <li>
                        <NavLink to='/'>
                            <BsHouseDoorFill/>
                        </NavLink>
                  </li>
                  {
                    user && (
                        <li>
                            <NavLink to='/'>
                                <BsCameraFill/> 
                            </NavLink>
                        </li>
                    )
                  }
                  <li>
                    <span onClick={handleLogou}>Sair</span>
                  </li>
                </>   
                  ):(
                <>
                    <li>
                        <NavLink to='/login'>Entrar</NavLink>
                    </li>
                </>
                  )
                
            }
        </ul>

    </nav>
  )
}

export default Navbar