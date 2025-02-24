import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import './VideoPlayer.css';

const VideoPlayer = () => {
  const { id } = useParams(); // ID del vídeo
  const navigate = useNavigate(); // Per navegar entre pàgines
  const [video, setVideo] = useState(null);

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const docRef = doc(db, 'videos', id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setVideo(docSnap.data());
        } else {
          console.error('No s’ha trobat el document!');
        }
      } catch (error) {
        console.error('Error carregant el vídeo:', error);
      }
    };

    fetchVideo();
  }, [id]);

  const handleDelete = async () => {
    try {
      await deleteDoc(doc(db, 'videos', id));
      alert('Vídeo eliminat correctament!');
      navigate(-1); // Torna a la pàgina anterior
    } catch (error) {
      console.error('Error eliminant el vídeo:', error);
    }
  };

  if (!video) {
    return <p>Carregant vídeo...</p>;
  }

  return (
    <div className="video-player-container">
      <h2>{video.title}</h2>
      <iframe
        width="560"
        height="315"
        src={video.link}
        title={video.title}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
      <div>
      <button className="delete-button" onClick={handleDelete}>Esborrar Vídeo</button>
      <button onClick={() => navigate(-1)} className="back-button1">
        Tornar Enrere
      </button>
      </div>
      
    </div>
  );
};

export default VideoPlayer;