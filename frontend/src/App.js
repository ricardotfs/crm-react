
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/home/Home';
import Login from './pages/auth/Login';
import { useAuth } from './hooks/useAuth';
import Navbar from './components/navbar/Navbar';
import NavbarLateral from './components/navbar/NavbarLateral';
import TicketDetail from './pages/ticket/TicketDetail';
import Ticket from './pages/ticket/Ticket';
import Phone from './pages/phone/Phone';
import PhoneDetail from './pages/phone/PhoneDetail';

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

            <Route path='/ticket' element={<Ticket />} />
            <Route path='/ticket/:id' element={<TicketDetail />} />

            <Route path='/phone' element={<Phone />} />
            <Route path='/phone/:id' element={<PhoneDetail />} />

            <Route path='/phone/:id' element={<Phone />} />
          </Routes>
        </div>
        <NavbarLateral />
      </BrowserRouter>
    </div>
  );
}

export default App;
