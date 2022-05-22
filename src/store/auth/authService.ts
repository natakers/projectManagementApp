import axios from 'axios';

const API_URL = 'https://still-earth-24890.herokuapp.com';

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

  // if (response.data) {
  //   // localStorage.setItem('user', JSON.stringify(response.data))
  // }
  return response.data;
};

// Login user
const signin = async (userData: {
  login: string;
  password: string;
}) => {
  const response = await axios.post(`${API_URL}/signin`, userData);
  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }
  return response.data;
};

// Logout user
const logout = () => {
  localStorage.removeItem('user');
};

const authService = {
  signup,
  signin,
  logout,
};

export default authService;
