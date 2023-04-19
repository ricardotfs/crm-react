import React from 'react'
import './Auth.css'

//Components
import { Link } from 'react-router-dom'
import Message from '../../components/message/Message'

//Hooks
import { useEffect,useState } from 'react'
import { useSelector,useDispatch } from 'react-redux'

const Login = () => {
  return (
    <div id='login'>
      <h2>CRM</h2>
        <form>
          <input type="text" placeholder='E-mail'/>
          <input type="password" placeholder='Senha' />
          <input type="submit"  value='Entrar'/> 
        </form>
    </div>
  )
}

export default Login