import React from 'react';

const YouTubeVideo = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
      <iframe
        width="560"
        height="315"
        src="https://www.youtube.com/embed/vx3JfFuKGXM?si=EcC5UNSMBF1a96pX"
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default YouTubeVideo;

