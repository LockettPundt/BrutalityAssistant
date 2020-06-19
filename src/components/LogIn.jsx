import React, { useState } from 'react';
import {
  Form, FormField, Box, Button, TextInput,
} from 'grommet';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import API_URL from '../utils/appUtils';

const LogIn = ({ setUserEmail, setUserToken }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailPlaceholder, setEmailPlaceholder] = useState('Email');
  const [passwordPlaceholder, setPasswordPlaceholder] = useState('Password');
  const history = useHistory();


  const logUserIn = async () => {
    const userInfo = {
      email,
      password,
    };

    const url = `${API_URL}users/login`;
    const user = await axios.put(url, userInfo);

    if (user.data.error) {
      if (user.data.error.includes('email')) {
        setEmail('');
        setEmailPlaceholder(user.data.error);
      }
      if (user.data.error.includes('Password')) {
        setPassword('');
        setPasswordPlaceholder(user.data.error);
      }
    }
    if (user.data.token) {
      localStorage.clear();
      localStorage.setItem('token', user.data.token);
      localStorage.setItem('userEmail', user.data.email);
      setUserEmail(user.data.email);
      setUserToken(user.data.token);
      setEmail('');
      setPassword('');
      setPasswordPlaceholder('Password');
      setEmailPlaceholder('Email');
      history.push('/');
    }
  };

  return (
    <Box
      direction="column"
      margin={{
        horizontal: 'auto',
        top: 'xlarge',
      }}
      responsive
      pad="medium"
      width="medium"
    >
      <h1>Log In</h1>
      <Form onSubmit={logUserIn}>
        <FormField>
          <TextInput
            required
            value={email}
            placeholder={emailPlaceholder}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormField>
        <FormField>
          <TextInput
            required
            type="password"
            value={password}
            placeholder={passwordPlaceholder}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormField>
        <Box>
          <Button
            margin={{
              vertical: 'medium',
              horizontal: 'auto',
            }}
            type="submit"
            label="Log In"
          />

        </Box>

      </Form>
    </Box>
  );
};

export default LogIn;
