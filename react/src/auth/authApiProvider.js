// authApiProvider.js

import axios from 'axios';

const API_URL = 'http://localhost:8000'; 

// Function to handle user sign-in
const signIn = async (credentials, callback) => {
  try {
    const response = await axios.post(`${API_URL}/login`, credentials);
    if (response.data.success) {
      callback(response.data.user, response.data.message);
    } else {
      callback(null, response.data.message);
    }
    return {success: response.data.success, data: response.data.success ? response.data.user : null, message: response.data.message};
    
  } catch (error) {
    console.error('Error signing in:', error);
    callback(null, 'An error occurred while signing in');
    return { success: false, message: 'An error occurred while signing in' };
  }
};

// Function to handle user sign-out
const signOut = async (callback) => {
  // No need to send a request to the backend for logout
  callback({ success: true, message: 'User signed out successfully' });
};

let apiAuthProvider = {signIn, signOut}

export default apiAuthProvider
