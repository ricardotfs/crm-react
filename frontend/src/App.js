import './App.css';
import React from 'react';
import { BrowserRouter,Routes,Route,Navigate } from 'react-router-dom';
import Home from './pages/home/Home';
import Login from './pages/auth/Login';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <div className='container'>
        <Routes>
          <Route path='/' element={auth ? <Home/> : <Navigate to='/login'/>} />
          <Route path='/login' element={!auth ? <Login/> : <Navigate to='/'/>} />
        </Routes>
      </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
