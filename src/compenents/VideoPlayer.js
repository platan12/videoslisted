import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import './VideoPlayer.css';

const VideoPlayer = () => {
  const { id } = useParams(); // ID del vídeo
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
    </div>
  );
};

export default VideoPlayer;
