import axios from 'axios';

export const API_URL = 'https://frozen-depths-66382.herokuapp.com';

// Register user
const signup = async (userData: {
  name: string;
  login: string;
  password: string;
}) => {
  await axios.post(`${API_URL}/signup`, userData);
  const { login, password } = userData;
  const signInData = { login, password };
  const response = await axios.post(`${API_URL}/signin`, signInData);
  return response.data;
};

// Login user
const signin = async (userData: {
  login: string;
  password: string;
}) => {
  const response = await axios.post(`${API_URL}/signin`, userData);
  return response.data;
};

// Logout user
const logout = () => {
  //TODO: add all reset dispatches in future
};

const authService = {
  signup,
  signin,
  logout,
};

export default authService;
