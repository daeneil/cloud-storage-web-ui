import React, { useState, useEffect, useRef } from 'react';
import ReactPlayer from 'react-player';
import { Button, Slider, Progress, message } from 'antd'; // Example UI components
import { createClip } from './clipApi'; // Assuming a clip creation API

const VideoControls = ({ videoRef }) => {
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1);

  // For frame-by-frame navigation
  const [currentFrame, setCurrentFrame] = useState(0);

  useEffect(() => {
    const player = videoRef.current;
    if (player) {
      // ... existing event listeners

      // Get initial frame count
      player.getDuration().then((duration) => {
        setCurrentFrame(Math.floor(duration * 30)); // Assuming 30 FPS
      });
    }
  }, [videoRef]);

  const handlePlayPause = () => {
    playing ? videoRef.current.pause() : videoRef.current.play();
  };

  const handleSeek = (newValue) => {
    videoRef.current.seekTo(newValue);
  };

  const handleVolumeChange = (newValue) => {
    videoRef.current.setVolume(newValue);
  };

  const handleSpeedChange = (newValue) => {
    setPlaybackRate(newValue);
    videoRef.current.setPlaybackRate(newValue); // Adjust playback speed
  };

  const handleFrameNavigation = (direction) => {
    const step = direction === 'forward' ? 1 : -1;
    const newFrame = Math.max(0, Math.min(currentFrame + step, duration * 30)); // Ensure within bounds
    const newTime = newFrame / 30; // Convert frame to seconds
    videoRef.current.seekTo(newTime, 'seconds');
    setCurrentFrame(newFrame);
  };

  const handleClipCreation = async () => {
    const { startTime, endTime } = player.getCurrentTime(); // Get clip start/end times
    const clipData = await createClip(videoRef.current.currentSrc, startTime, endTime); // Call API

    if (clipData) {
      // Handle successful clip creation
      message.success('Clip created successfully!');
      // ... further actions, e.g., download or preview
    } else {
      // Handle error
      message.error('Failed to create clip.');
    }
  };

  return (
    <div className="video-controls">
      <Button onClick={handlePlayPause}>
        {playing ? 'Pause' : 'Play'}
      </Button>
      <Progress
        type="slider"
        value={currentTime / duration || 0}
        onAfterChange={handleSeek}
      />
      <Slider min={0} max={1} value={videoRef.current.volume} onChange={handleVolumeChange} />
      <Button.Group>
        <Button onClick={() => handleFrameNavigation('backward')}>
          Rewind
        </Button>
        <Button onClick={handleSpeedChange}>
          {playbackRate === 1 ? '1x' : playbackRate}
        </Button>
        <Button onClick={() => handleFrameNavigation('forward')}>
          Forward
        </Button>
      </Button.Group>
      <Button onClick={handleClipCreation}>Create Clip</Button>
    </div>
  );
};

export default VideoControls;
