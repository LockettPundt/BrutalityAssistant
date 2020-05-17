import React, { useState } from 'react';
import {
  Form, FormField, Box, Button, TextInput,
} from 'grommet';
import axios from 'axios';
import API_URL from '../utils/appUtils';

const LogIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailPlaceholder, setEmailPlaceholder] = useState('Email');
  const [passwordPlaceholder, setPasswordPlaceholder] = useState('Password');
  const logUserIn = async () => {
    const userInfo = {
      email,
      password,
    };
    // console.log('this is the user info', userInfo);
    const url = `${API_URL}users/login`;
    const checkUser = await axios.put(url, userInfo);
    // console.log(checkUser.data);
    if (checkUser.data.includes('valid email')) {
      setEmail('');
      setEmailPlaceholder(checkUser.data);
    }
    if (checkUser.data.includes('Password')) {
      setPassword('');
      setPasswordPlaceholder(checkUser.data);
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
        <Button
          type="submit"
          label="Log In"
        />
      </Form>
    </Box>
  );
};

export default LogIn;
