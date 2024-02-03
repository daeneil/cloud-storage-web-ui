// Import React and other dependencies
// ... (same as your provided code)

ReactDOM.render(<CCTVVideoPlayer videoId={'your-video-id'} metadata={{
    timestamp: '2023-11-21 15:30:00',
    cameraName: 'Front Entrance',
    cameraLocation: 'Main Lobby',
  }} />, document.getElementById('root'));
  
  import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import CameraList from './components/CameraList';
import CCTVVideoPlayer from './components/CCTVVideoPlayer';
import EventTimeline from './components/EventTimeline';
import VideoControls from './components/VideoControls';
import LoginPage from './components/LoginPage';
import HomePage from './components/HomePage';
import FileUploadPage from './components/FileUploadPage';
import VideoSearch from './components/VideoSearch';
import VideoDownload from './components/VideoDownload';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<HomePage />} /> // Adjust default route as needed
      <Route path="/login" element={<LoginPage />} />
      <Route path="/cameras" element={<CameraList />} />
      <Route path="/videos/:videoId" element={<CCTVVideoPlayer />} />
      <Route path="/events" element={<EventTimeline />} />
      <Route path="/file-upload" element={<FileUploadPage />} />
      <Route path="/video-search" element={<VideoSearch />} />
      <Route path="/video-download/:videoId" element={<VideoDownload />} /> // Dynamic route for video download
      {/* Add routes for VideoControls and other components as needed */}
    </Routes>
  </BrowserRouter>
);