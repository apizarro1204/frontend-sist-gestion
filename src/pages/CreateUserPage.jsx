import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { crearUsuario } from '../services/api';

const CreateUserPage = () => {
  const [nombreUsuario, setNombreUsuario] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleCreateUser = async (e) => {
    e.preventDefault();
    try {
      await crearUsuario(nombreUsuario, password);
      navigate('/create-user-success');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="create-user-container">
      <h2>Crear Usuario</h2>
      <form onSubmit={handleCreateUser}>
        <input
          type="text"
          placeholder="Nombre de usuario"
          value={nombreUsuario}
          onChange={(e) => setNombreUsuario(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <p className="error">{error}</p>}
        <button type="submit">Crear cuenta</button>
      </form>
      <p>
        ¿Ya tienes cuenta? <a href="/">Iniciar sesión</a>
      </p>
    </div>
  );
};

export default CreateUserPage;
