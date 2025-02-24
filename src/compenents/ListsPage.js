import React, { useEffect, useState } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import './ListsPage.css';

const ListsPage = () => {
  const [lists, setLists] = useState([]);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Obtenir l'usuari autenticat
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchLists = async () => {
      if (user) {
        try {
          // Consulta a Firebase filtrant per usuari
          const q = query(collection(db, 'videos'), where('usuari', '==', user.uid));
          const querySnapshot = await getDocs(q);

          // Crear un conjunt únic de llistes
          const listsSet = new Set();
          querySnapshot.docs.forEach((doc) => {
            const videoData = doc.data();
            if (videoData.llista) {
              listsSet.add(videoData.llista);
            }
          });

          setLists(Array.from(listsSet)); // Convertim el conjunt en una llista
        } catch (error) {
          console.error('Error obtenint les llistes:', error);
        }
      }
    };

    fetchLists();
  }, [user]);

  const handleNavigate = (listName) => {
    navigate(`/videos/${listName}`); // Navegar a la pàgina de vídeos d'una llista específica
  };

  return (
    <div className="lists-page-container">
      <h2 className="lists-page-title">Les teves llistes</h2>
      <button className="add-video-button" onClick={() => navigate('/add-video')}>
        ➕ Afegir Vídeo
      </button>
      <div className="lists-button-list">
        {lists.map((listName, index) => (
          <button
            key={index}
            className="list-button"
            onClick={() => handleNavigate(listName)}
          >
            {listName}
          </button>
        ))}
        <button onClick={() => navigate('/')} className="back-button">
        Tornar a Pagina principal
      </button>
      </div>
    </div>
  );
};

export default ListsPage;
