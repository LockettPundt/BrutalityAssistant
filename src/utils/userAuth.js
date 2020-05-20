import axios from 'axios';
import { useHistory } from 'react-router-dom';
import API_URL from './appUtils';

const userAuth = async () => {
  const history = useHistory();
  const userToken = localStorage.getItem('token ');
  const authRequest = await axios.post(`${API_URL}userauth`, { userToken });
  console.log(authRequest);
  if (authRequest.status === 403) {
    localStorage.clear();
    history.push('/');
  }
};


export default userAuth;
