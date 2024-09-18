import React, { useState, useEffect } from 'react';
import './App.css';
import Home from './Home';

function App() {
  const [showHome, setShowHome] = useState(false);
  const [videoUrl, setVideoUrl] = useState('./img/splash_video_landscape.mp4');

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 500) {
        setVideoUrl('./img/splash_video_portrait.mp4'); // Replace with your mobile video URL
      }else {
        setVideoUrl('./img/splash_video_landscape.mp4'); // Replace with your landscape video URL
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleVideoEnd = () => {
    setShowHome(true);
  };

  return (
    <div className="App">
      {showHome ? (
        <Home />
      ) : (
        <div className='intro-video-container'>
          <video
            src={videoUrl}
            className="intro-video"
            autoPlay
            muted
            onEnded={handleVideoEnd}
          />
        </div>
      )}
    </div>
  );
}

export default App;