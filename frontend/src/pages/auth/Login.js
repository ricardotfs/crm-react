import React from 'react'
import './Auth.css'

//Components
import Message from '../../components/message/Message'

//Hooks
import { useEffect,useState } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { login,reset } from '../../slice/authSlices'


const Login = () => {

  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const dispatch = useDispatch();
  const {loading, error} = useSelector((state) => state.auth);

  const handleSubmit = (e) =>{
    e.preventDefault();

    const user = {email, password};

    dispatch(login(user));

  }

  useEffect(()=>{

    dispatch(reset());

  },[dispatch]);

  return (
    <div id='login'>
      <h2>CRM</h2>
      <p className='subtitle'>Faça o login pra ver oque há de novo.</p>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder='E-mail' onChange={(e) => setEmail(e.target.value)} value={email}/>
          <input type="password" placeholder='Senha' onChange={(e)=> setPassword(e.target.value)} value={password} />

          {!loading && <input type="submit"  value='Entrar'/> }
          {loading && <input type="submit"  value='Aguarde...' disabled/> }
          {error && <Message msg={error} type='error'/>}

        </form>

    </div>
  )
}

export default Login