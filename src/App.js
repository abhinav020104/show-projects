import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import Home from './Home';

function App() {
  const [showHome, setShowHome] = useState(false);
  const [videoUrl, setVideoUrl] = useState('./img/splash_video_landscape.mp4');
  const videoRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 500) {
        setVideoUrl('./img/splash_video_portrait.mp4'); // Use portrait video for mobile
      } else {
        setVideoUrl('./img/splash_video_landscape.mp4'); // Use landscape video for larger screens
      }
    };

    // Set video URL initially and on resize
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize); // Cleanup listener
    };
  }, []);

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 2; // Set playback speed
    }
  };

  const handleVideoEnd = () => {
    setShowHome(true); // Navigate to Home after the video ends
  };

  return (
    <div className="App">
      {showHome ? (
        <Home />
      ) : (
        <div className='intro-video-container'>
          <video
            ref={videoRef}
            src={videoUrl}
            className="intro-video"
            autoPlay
            muted
            onEnded={handleVideoEnd}
            onLoadedMetadata={handleLoadedMetadata} // Set playback speed after metadata is loaded
          />
        </div>
      )}
    </div>
  );
}

export default App;
