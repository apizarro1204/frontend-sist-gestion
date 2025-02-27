import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateUserSuccessPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirigir a la página de login después de 5 segundos
    const timer = setTimeout(() => {
      navigate('/');
    }, 5000);

    // Limpiar el timer si el componente se desmonta
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="create-user-success-container">
      <h2>¡Cuenta creada con éxito!</h2>
      <p>Ahora puedes iniciar sesión con tus credenciales.</p>
      <p>Serás redirigido al login en 5 segundos...</p>
    </div>
  );
};

export default CreateUserSuccessPage;
