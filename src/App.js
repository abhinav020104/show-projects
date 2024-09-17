import React, { useState } from 'react';
import './App.css';
import Home from './Home';

function App() {
  const [showHome, setShowHome] = useState(false);

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
            src="./img/Splash_Video.mp4"
            className="intro-video"
            // width={"500px"}
            // height={"500px"}
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
