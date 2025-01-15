import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { useNavigate } from 'react-router-dom';
import './VideoList.css';

const VideoList = () => {
  const [videos, setVideos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'videos'));
        const videoList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setVideos(videoList);
      } catch (error) {
        console.error('Error obtenint els vídeos:', error);
      }
    };

    fetchVideos();
  }, []);

  const handleNavigate = (id) => {
    navigate(`/video/${id}`);
  };

  return (
    <div className="video-list-container">
      <h2 className="video-list-title">Llista de Vídeos</h2>
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
