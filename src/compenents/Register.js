import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import './Register.css';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    const auth = getAuth();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate('/'); // Tornar a la pàgina de login
    } catch (error) {
      setError('Error al registrar-se. Revisa les dades introduïdes.');
    }
  };

  return (
    <div className="register-container">
      <h2>Registrar-se</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleRegister}>
        <input
          type="email"
          placeholder="Correu electrònic"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Contrasenya"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Crear Compte</button>
      </form>
      <button onClick={() => navigate('/')} className="back-button">
        Tornar a Iniciar Sessió
      </button>
    </div>
  );
};

export default Register;
