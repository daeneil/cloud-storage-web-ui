import axios from 'axios'; // Assuming you're using axios for API calls

const API_URL = 'https://your-api-endpoint.com/clips'; // Replace with your actual API endpoint

export const createClip = async (videoUrl, startTime, endTime) => {
  try {
    const response = await axios.post(API_URL, {
      videoUrl,
      startTime,
      endTime,
    });

    return response.data; // Assuming the API returns clip data
  } catch (error) {
    console.error('Clip creation error:', error);
    return null; // Indicate failure
  }
};
