import React, { useState, useEffect } from 'react';
import ReactPlayer from 'react-player';
import {deleteFile, downloadFile, getCameraList, getPresignedUrl, getVideoList, listFiles, uploadFile} from '../utils/cloudStorage'; // Assuming imported functions

const CCTVVideoPlayer = ({ videoId, metadata, onControl }) => {
  const [player, setPlayer] = useState(null);
  const [playbackState, setPlaybackState] = useState({
    playing: false,
    currentTime: 0,
    volume: 0.5,
  });

  useEffect(() => {
    // Fetch video source and metadata
    async function fetchData() {
      try {
        const videoSource = await cloudStorage.getVideoSource(videoId);
        setPlayer({
          url: videoSource.url,
          playing: false,
          config: {
            file: videoSource.file, // For cloud storage downloads
            playing: false,
            width: '100%',
            controls: true, // Enable built-in controls
            playIcon: '▶',
            pauseIcon: '⏸',
            volumePanel: { inline: false }, // Custom volume control
            light: false, // Disable default UI elements
          },
        });
      } catch (error) {
        console.error('Error fetching video data:', error);
        // Handle error gracefully, e.g., display error message
      }
    }
    fetchData();
  }, [videoId]);

  const handleControl = (action) => {
    switch (action) {
      case 'play':
        setPlaybackState({ ...playbackState, playing: true });
        player.play();
        break;
      case 'pause':
        setPlaybackState({ ...playbackState, playing: false });
        player.pause();
        break;
      // ... handle other controls
    }
    onControl(action); // Pass control events to parent if needed
  };

  // ... error handling and custom controls implementation ...

  return (
    <div>
      <ReactPlayer
        {...player}
        onPlay={() => handleControl('play')}
        onPause={() => handleControl('pause')}
        onEnded={() => handleControl('ended')}
        onProgress={(state) => setPlaybackState({ ...playbackState, currentTime: state.playedSeconds })}
        onVolumeChange={(volume) => setPlaybackState({ ...playbackState, volume })}
      />
      <div>
        <p>Timestamp: {metadata.timestamp}</p>
        <p>Camera Name: {metadata.cameraName}</p>
        <p>Camera Location: {metadata.cameraLocation}</p>
      </div>
      {/* Additional controls or metadata display as needed */}
    </div>
  );
};

export default CCTVVideoPlayer;
