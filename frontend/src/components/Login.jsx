// Login.js

import { useState } from 'react';
import axios from 'axios';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');

  const handleLogin = async () => {
    try {
      // Realiza una solicitud POST para iniciar sesión
      const response = await axios.post('http://localhost:4000/login', { username, password });

      // Obtiene el token JWT desde la respuesta del servidor
      const token = response.data.token;

      // Guarda el token en el estado
      setToken(token);

       // Configura el encabezado "Authorization" para las solicitudes Axios
       axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      // Limpia los campos de nombre de usuario y contraseña
      setUsername('');
      setPassword('');
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
    }
  };

  return (
    <div>
      <h1>Iniciar Sesión</h1>
      <div>
        <input
          type="text"
          placeholder="Nombre de Usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button onClick={handleLogin}>Iniciar Sesión</button>
      {token && <p>Token JWT: {token}</p>}
      {console.log({token})}
    </div>
  );
}

export default Login;
