export const verificarTokenExpirado = () => {
    const token = sessionStorage.getItem('token');
    
    if (!token) {
      return true;
    }
  
    // El JWT está compuesto por 3 partes separadas por un punto
    const payload = token.split('.')[1];
    
    // Decodificar el payload desde base64
    const decoded = JSON.parse(atob(payload));
    
    const exp = decoded?.exp * 1000;
    const ahora = Date.now();

    console.log('Expiración del token (milisegundos):', exp);
    console.log('Fecha y hora actuales (milisegundos):', ahora);
  
    if (exp < ahora) {
      return true;
    }
  
    return false;
  };
  