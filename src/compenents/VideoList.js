import React, { useEffect, useState } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { db } from '../firebaseConfig';
import { useNavigate } from 'react-router-dom';
import './VideoList.css';

const VideoList = () => {
  const [videos, setVideos] = useState([]);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchVideos = async () => {
      if (user) {
        try {
          const q = query(collection(db, 'videos'), where('usuari', '==', user.uid));
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
  }, [user]);

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
