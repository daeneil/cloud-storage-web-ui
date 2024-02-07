import React, { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import HomePage from './components/HomePage';
import FileUploadPage from './components/FileUploadPage';
import CCTVVideoPlayer from './components/CCTVVideoPlayer';
import CameraList from './components/CameraList';
import VideoControls from './components/VideoControls';
import VideoSearch from './components/VideoSearch';
import VideoDownload from './components/VideoDownload';
import EventTimeline from './components/EventTimeline';
import auth0 from './components/auth0Config.js';

// Import utility functions
import {
  getCameraList,
  getVideoList,
  getVideoMetadata,
  // ... other cloudStorage functions
} from './utils/cloudStorage';
import { createVideoPlayer, handleVideoControls } from './utils/videoPlayer';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    auth0.isAuthenticated()
      .then((isAuthenticated) => setIsAuthenticated(isAuthenticated))
      .then(() => {
        if (isAuthenticated) {
          auth0.getUser()
            .then((user) => setUser(user))
            .catch((error) => console.error('Error fetching user:', error));
        }
      });
  }, []);

  const [cameras, setCameras] = useState([]);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    // Fetch camera and video lists on app load
    async function fetchData() {
      try {
        const fetchedCameras = await getCameraList();
        const fetchedVideos = await getVideoList();
        setCameras(fetchedCameras);
        setVideos(fetchedVideos);
      } catch (error) {
        console.error('Error fetching data:', error);
        // Handle errors gracefully, e.g., display error messages
      }
    }
    fetchData();
  }, []);

  // ... other component logic ...

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={isAuthenticated ? <HomePage /> : <LoginPage handleLogin={auth0.loginWithRedirect} />}
        />
        {/* Protect other routes similarly */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/cameras" element={<CameraList />} />
        <Route path="/" element={<HomePage />} /> // Adjust default route as needed
        <Route path="/videos/:videoId" element={<CCTVVideoPlayer />} />
        <Route path="/controls" element={<VideoControls />} /> {/* Route for VideoControls */}
        <Route path="/events" element={<EventTimeline />} />
        <Route path="/file-upload" element={<FileUploadPage />} />
        <Route path="/video-search" element={<VideoSearch />} />
        <Route path="/video-download/:videoId" element={<VideoDownload />} /> // Dynamic route for video download
        {/* Add routes for VideoControls and other components as needed */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
