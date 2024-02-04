import React, { useState, useEffect } from 'react';
import { Button, Progress } from 'antd'; // Example UI components
import {deleteFile, downloadFile, getCameraList, getPresignedUrl, getVideoList, listFiles, uploadFile} from '../utils/cloudStorage'; // Assuming imported functions

const VideoDownload = ({ videoId }) => {
  const [downloading, setDownloading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);

  const handleDownload = async () => {
    setDownloading(true);
    setError(null);

    try {
      const videoUrl = await cloudStorage.getVideoDownloadUrl(videoId);
      const blob = await fetch(videoUrl).then((res) => res.blob());
      const filename = generateFilename(videoId, blob.type);

      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = filename;
      link.click();

      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = () => {
        // Calculate progress based on loaded data
        const loadedBytes = reader.result.length;
        const totalBytes = blob.size;
        setProgress(Math.round((loadedBytes / totalBytes) * 100));
      };
    } catch (err) {
      setError(err);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div>
      {downloading && <Progress percent={progress} status="active" />}
      {error && <p className="error">{error.message}</p>}
      <Button onClick={handleDownload} disabled={downloading}>
        {downloading ? 'Downloading...' : 'Download Video'}
      </Button>
    </div>
  );
};

export default VideoDownload;
