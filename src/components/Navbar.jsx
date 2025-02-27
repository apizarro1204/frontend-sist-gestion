import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ nombreUsuario }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div className="navbar">
      <div className="navbar-content">
        <p className="navbar-user">Bienvenido, {nombreUsuario}</p>
        <button className="navbar-btn" onClick={() => navigate('/home')}>Tareas</button>
        <button className="navbar-btn" onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default Navbar;
