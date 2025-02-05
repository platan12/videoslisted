import React, { useEffect, useState } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { useParams, useNavigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import './VideoList.css';

const VideoList = () => {
  const [videos, setVideos] = useState([]);
  const { listName } = useParams(); // Obtenim el nom de la llista de la ruta
  const auth = getAuth();
  const user = auth.currentUser;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVideos = async () => {
      
      if (user) {
        try {
          // Consulta a Firebase filtrant per llista i usuari
          const q = query(
            collection(db, 'videos'),
           
            where('llista', '==', listName),
            where('usuari', '==', user.uid)
          );
          const querySnapshot = await getDocs(q);
          const videoList = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          }));
          setVideos(videoList);
        } catch (error) {
          console.error('Error obtenint els vídeos:', error);
        }
      }
    };

    fetchVideos();
  }, [listName, user]);

  const handleNavigate = (id) => {
    navigate(`/video/${id}`);
  };

  return (
    <div className="video-list-container">
      <h2 className="video-list-title">{`Vídeos de la llista: ${listName}`}</h2>

      <div className="video-button-list">
        {videos.map(video => (
          <button
            key={video.id}
            className="video-button"
            onClick={() => handleNavigate(video.id)}
          >
            {video.title}
          </button>
        ))}
      </div>
    </div>
  );
};

export default VideoList;
