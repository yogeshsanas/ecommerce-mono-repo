import axios from 'axios';

// Create an Axios instance with the base URL and timeout
const apiClient = axios.create({
  baseURL: 'http://localhost:8080',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Function to get products
export const getProducts = async () => {
  try {
    const response = await apiClient.get('/product');
    return response.data; // Return the products data
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error; // Re-throw the error to handle it in the calling component
  }
};

// Function to process payment
export const processPayment = async (paymentDetails: { amount: number; paymentMethod: string; orderId: string }) => {
  try {
    const response = await apiClient.post('/process-payment', paymentDetails);
    return response.data; // Return the payment processing response
  } catch (error) {
    console.error('Error processing payment:', error);
    throw error; // Re-throw the error to handle it in the calling component
  }
};

// Function to send OTP to the user's email
export const sendOtp = async (email: string) => {
  try {
    const response = await apiClient.post('/send-otp', { email });
    return response.data; // Return success message
  } catch (error) {
    console.error('Error sending OTP:', error);
    throw error; // Re-throw the error to handle it in the calling component
  }
};

// Function to verify OTP
export const verifyOtp = async (email: string, otp: string) => {
  try {
    const response = await apiClient.post('/verify-otp', { email, otp });
    return response.data; // Return success message
  } catch (error) {
    console.error('Error verifying OTP:', error);
    throw error; // Re-throw the error to handle it in the calling component
  }
};

export default apiClient;
