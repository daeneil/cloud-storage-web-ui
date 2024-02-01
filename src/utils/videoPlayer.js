import React, { useState, useRef, useEffect } from 'react';
import ReactPlayer from 'react-player';

const VideoPlayer = ({ videoUrl, controls = true, onReady, onError }) => {
  const playerRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [buffered, setBuffered] = useState(0);
  const [duration, setDuration] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (playerRef.current && onReady) {
      onReady(playerRef.current);
    }
  }, [playerRef, onReady]);

  const handlePlayPause = () => {
    if (playing) {
      playerRef.current.pause();
    } else {
      playerRef.current.play();
    }
    setPlaying(!playing);
  };

  const handleProgress = (progress) => {
    setBuffered(progress.playedSeconds);
    setDuration(progress.loadedSeconds);
  };

  const handleError = (err) => {
    setError(err);
    console.error('Video error:', err);
  };

  return (
    <div className="video-player">
      {error && <p className="error">{error.message}</p>}
      <ReactPlayer
        ref={playerRef}
        url={videoUrl}
        playing={playing}
        onProgress={handleProgress}
        onError={handleError}
        controls={controls}
      />
      {controls && (
        <div className="controls">
          <button onClick={handlePlayPause}>{playing ? 'Pause' : 'Play'}</button>
          <progress max={duration} value={buffered} />
          {/* Add more controls as needed */}
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;
