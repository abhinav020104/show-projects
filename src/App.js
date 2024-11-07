import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import Home from './Home';
import { motion, useScroll, useSpring } from "framer-motion";

function App() {
  const [showHome, setShowHome] = useState(false);
  const [videoUrl, setVideoUrl] = useState('./img/splash_video_landscape.mp4');
  const videoRef = useRef(null);

  // Initialize scrollYProgress with useScroll and apply a spring animation for smoother effect
  const { scrollYProgress } = showHome ? useScroll() : { scrollYProgress: 0 };
  const progress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 500) {
        setVideoUrl('./img/splash_video_portrait.mp4'); 
      } else {
        setVideoUrl('./img/splash_video_landscape.mp4');
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); 

  useEffect(() => {
    // Reset scroll position when the video ends to avoid the initial full progress bar
    if (showHome) {
      window.scrollTo(0, 0);
    }
  }, [showHome]);

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 2; 
    }
  };

  const handleVideoEnd = () => {
    setShowHome(true); 
    window.scrollTo(0, 0);
  };

  return (
    <div className="App">
      {showHome ? (
        <div>
          <motion.div 
            className="progress-bar"
            style={{ scaleX: progress }}
          ></motion.div>
          <Home />
        </div>
      ) : (
        <div className="intro-video-container">
          <video
            ref={videoRef}
            src={videoUrl}
            className="intro-video"
            autoPlay
            muted
            onEnded={handleVideoEnd}
            onLoadedMetadata={handleLoadedMetadata} 
          />
        </div>
      )}
    </div>
  );
}

export default App;
