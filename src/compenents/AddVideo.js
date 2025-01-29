import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { getAuth } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const AddVideo = () => {
  const [title, setTitle] = useState('');
  const [link, setLink] = useState('');
  const [list, setList] = useState('');
  const navigate = useNavigate();
  const auth = getAuth();
  const user = auth.currentUser;

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!user) {
      alert('Has d’estar identificat per afegir vídeos.');
      return;
    }

    try {
      await addDoc(collection(db, 'videos'), {
        title,
        link,
        llista: list,
        usuari: user.uid, // Guardem la UID de l'usuari
      });
      alert('Vídeo afegit correctament!');
      navigate(-1); // Torna enrere després d’afegir el vídeo
    } catch (error) {
      console.error('Error afegint vídeo:', error);
    }
  };

  return (
    <div className="add-video-container">
      <h2>Afegir un Nou Vídeo</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Títol del vídeo"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Enllaç del vídeo"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Nom de la llista"
          value={list}
          onChange={(e) => setList(e.target.value)}
          required
        />
        <button type="submit">Afegir Vídeo</button>
      </form>
    </div>
  );
};

export default AddVideo;
