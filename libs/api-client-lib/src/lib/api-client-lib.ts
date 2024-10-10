import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:8080',
  timeout: 1000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getProducts = () => {
  return apiClient.get('/product');
};

// Function to send OTP to the user's email
export const sendOtp = (email: string) => {
  return apiClient.post('/send-otp', { email });
};

// Function to verify OTP
export const verifyOtp = (email: string, otp: string) => {
  return apiClient.post('/verify-otp', { email, otp });
};

export default apiClient;
