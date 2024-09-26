
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/home/Home';
import Login from './pages/auth/Login';
import { useAuth } from './hooks/useAuth';
import Navbar from './components/navbar/Navbar';
import NavbarLateral from './components/navbar/NavbarLateral';
import TicketDetails from './pages/ticket/TicketDetails';
import Ticket from './pages/ticket/Ticket';
import Phone from './pages/phone/Phone';

function App() {
  const { auth, loading } = useAuth();

  if (loading) {
    return <p>Carregando ...</p>
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className='container'>
          <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='/Ticket' element={<Ticket />} />
            <Route path='/ticket/:id' element={<TicketDetails />} />
            <Route path='/phone/:id' element={<Phone />} />
          </Routes>
        </div>
        <NavbarLateral />
      </BrowserRouter>
    </div>
  );
}

export default App;
