/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import {
  Form, FormField, TextInput, Button,
} from 'grommet';
import axios from 'axios';
import API_URL from '../utils/appUtils';

const UserRegister = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailPlaceholder, setEmailPlaceholder] = useState('Email');
  const [passwordPlaceholder, setPasswordPlaceholder] = useState('Password');

  const postJob = async () => {
    const info = {
      firstName,
      lastName,
      email,
      password,
    };
    const url = `${API_URL}users/register`;
    const newUserPost = await axios.post(url, info);
    // console.log(newUserPost.data);
    if (newUserPost.data.includes('email')) {
      setEmail('');
      setEmailPlaceholder(newUserPost.data);
    }
    if (newUserPost.data.includes('Password')) {
      setPassword('');
      setPasswordPlaceholder(newUserPost.data);
    }
    if (newUserPost.data === 'OK') {
      setPassword('');
      setEmailPlaceholder('Email');
      setPasswordPlaceholder('Password');
      setFirstName('');
      setLastName('');
      setEmail('');
    }
  };

  return (
    <Form onSubmit={postJob}>
      <FormField>
        <TextInput
          value={firstName}
          placeholder="First Name"
          required
          onChange={(e) => setFirstName(e.target.value)}
        />
      </FormField>
      <FormField>
        <TextInput
          value={lastName}
          placeholder="Last Name"
          required
          onChange={(e) => setLastName(e.target.value)}
        />
      </FormField>
      <FormField>
        <TextInput
          value={email}
          placeholder={emailPlaceholder}
          required
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormField>
      <FormField>
        <TextInput
          type="password"
          value={password} // i'll delete this later.
          placeholder={passwordPlaceholder}
          required
          onChange={(e) => setPassword(e.target.value)}
        />
      </FormField>
      <Button
        type="submit"
        label="Register"
      />
    </Form>
  );
};


export default UserRegister;
