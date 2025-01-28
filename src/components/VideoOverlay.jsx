import React, { useRef } from 'react';

export default function VideoOverlay({ videoSrc, position = 'right', onVideoEnd, isVideoFading }) {
  if (!videoSrc) return null;
  
  const videoRef = useRef();
  
  const handleVideoEnd = (e) => {
    if (e.target.currentTime > 0.5) {
      onVideoEnd();
    } else {
      if (videoRef.current) {
        videoRef.current.currentTime = 0;
        videoRef.current.play();
      }
    }
  };

  return (
    <div className={`video-overlay-${position}`}>
      <div className={`video-wrapper ${isVideoFading ? 'video-fade-out' : ''}`}>
        <video
          ref={videoRef}
          src={videoSrc}
          autoPlay
          playsInline
          onEnded={handleVideoEnd}
          style={{ objectFit: 'cover' }}
        />
      </div>
    </div>
  );
} 