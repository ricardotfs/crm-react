import './App.css';
import React from 'react';
import { BrowserRouter,Routes,Route,Navigate } from 'react-router-dom';
import Home from './pages/home/Home';
import Login from './pages/auth/Login';
import { useAuth } from './hooks/useAuth';
import Navbar from './components/navbar/Navbar';
import Ticket from './pages/ticket/Ticket';

function App() {
  const {auth,loading} = useAuth();

  if(loading){
    return <p>Carregando ...</p>
  }
  
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar/>
      <div className='container'>
        <Routes>
          <Route path='/' element={auth ? <Home/> : <Navigate to='/login'/>} />
          <Route path='/login' element={<Login/> } />
          <Route path='/ticket' element={<Ticket/> } />
        </Routes>
      </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
