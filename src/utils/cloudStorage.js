import AWS from 'aws-sdk';
import { deleteFile, downloadFile, getPresignedUrl, listFiles, uploadFile } from '../utils/cloudStorage';

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID, // Securely retrieve credentials
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: 'your-region',
});

// Upload a file to S3
export const uploadFile = async (file, filename, bucket = 'your-bucket-name') => {
  try {
    const params = {
      Bucket: bucket,
      Key: filename,
      Body: file,
      ContentType: file.type,
    };
    await s3.upload(params).promise();
    return true;
  } catch (err) {
    console.error('Upload error:', err);
    return false;
  }
};

// Download a file from S3
export const downloadFile = async (filename, bucket = 'your-bucket-name') => {
  try {
    const params = {
      Bucket: bucket,
      Key: filename,
    };
    const data = await s3.getObject(params).promise();
    return data.Body;
  } catch (err) {
    console.error('Download error:', err);
    throw err; // Re-throw for error handling in calling component
  }
};

// List files in a bucket or folder
export const listFiles = async (prefix = '', bucket = 'your-bucket-name') => {
  try {
    const params = {
      Bucket: bucket,
      Prefix: prefix,
    };
    const data = await s3.listObjectsV2(params).promise();
    return data.Contents.map((item) => ({
      key: item.Key,
      size: item.Size,
      lastModified: item.LastModified,
    }));
  } catch (err) {
    console.error('List files error:', err);
    return [];
  }
};

// Delete a file from S3
export const deleteFile = async (filename, bucket = 'your-bucket-name') => {
  try {
    const params = {
      Bucket: bucket,
      Key: filename,
    };
    await s3.deleteObject(params).promise();
    return true;
  } catch (err) {
    console.error('Delete error:', err);
    return false;
  }
};

// Generate a presigned URL for a file (if applicable)
export const getPresignedUrl = async (filename, bucket = 'your-bucket-name') => {
  try {
    const params = {
      Bucket: bucket,
      Key: filename,
      Expires: 60 * 60, // Set expiration time in seconds
    };
    const url = await s3.getSignedUrl('getObject', params);
    return url;
  } catch (err) {
    console.error('Get presigned URL error:', err);
    return null;
  }
};
// ... other imports and code in cloudStorage.js ...

// Get a list of cameras
export const getCameraList = async (bucket = 'your-bucket-name', folder = 'cameras') => {
  try {
    const cameras = await listFiles(folder, bucket);
    return cameras.map((item) => ({
      name: item.key.replace(folder + '/', ''), // Extract camera name from key
      // ... other camera details if needed ...
    }));
  } catch (err) {
    console.error('Failed to get camera list:', err);
    return [];
  }
};

// Get a list of videos
export const getVideoList = async (bucket = 'your-bucket-name', folder = 'videos') => {
  try {
    const videos = await listFiles(folder, bucket);
    return videos.map((item) => ({
      name: item.key.replace(folder + '/', ''), // Extract video name from key
      size: item.size,
      lastModified: item.lastModified,
      // ... other video details if needed ...
    }));
  } catch (err) {
    console.error('Failed to get video list:', err);
    return [];
  }
};
