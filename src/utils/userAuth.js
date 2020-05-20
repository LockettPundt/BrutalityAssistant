import axios from 'axios';
import API_URL from './appUtils';

const userAuth = async () => {
  const userToken = localStorage.getItem('token') || null;
  const userEmail = localStorage.getItem('userEmail') || null;
  if (userToken && userEmail) {
    const authRequest = await axios.post(`${API_URL}userauth`, { userToken });
    // console.log('here is the response in auth', authRequest);
    if (!authRequest.data.error) return authRequest;
  }
  localStorage.clear();
  return false;
};


export default userAuth;
