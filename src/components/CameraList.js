import React, { useState, useEffect } from 'react';
import { Grid, Skeleton } from 'antd'; // Example UI components
import { cloudStorage } from '../utils/cloudStorage'; // Assuming imported functions

const CameraList = ({ onCameraSelect }) => {
  const [cameras, setCameras] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchCameras() {
      try {
        const fetchedCameras = await cloudStorage.getCameraList();
        setCameras(fetchedCameras);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    }
    fetchCameras();
  }, []);

  const handleCameraClick = (camera) => {
    onCameraSelect(camera);
  };

  return (
    <div>
      {loading && (
        <Grid.Container justify="center">
          <Grid.Row>
            {/* Skeleton loading placeholder */}
            {new Array(4).fill(null).map((_, index) => (
              <Grid.Col key={index} span={4}>
                <Skeleton avatar />
              </Grid.Col>
            ))}
          </Grid.Row>
        </Grid.Container>
      )}
      {error && <p>Error fetching cameras: {error.message}</p>}
      {!loading && !error && (
        <Grid.Container>
          {cameras.map((camera) => (
            <Grid.Item key={camera.id}>
              <div onClick={() => handleCameraClick(camera)} style={{ cursor: 'pointer' }}>
                <h3>{camera.name}</h3>
                <p>Status: {camera.status}</p>
                <p>Location: {camera.location}</p>
                <p>Last Recording: {camera.lastRecordingTime}</p>
              </div>
            </Grid.Item>
          ))}
        </Grid.Container>
      )}
    </div>
  );
};

export default CameraList;
