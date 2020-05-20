/* eslint-disable react/require-default-props */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Box, Anchor, Button } from 'grommet';
import PropTypes from 'prop-types';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import API_URL from '../utils/appUtils';

const Index = ({ userEmail, userToken }) => {
  const [userName, setUserName] = useState(false);
  const [userAuthStatus, setUserAuthStatus] = useState(false);
  const history = useHistory();
  useEffect(() => {
    const getUser = async () => {
      const response = await axios.post(`${API_URL}userauth`, {
        email: userEmail,
        userToken,
      });
      console.log('here is the response', response);
      const { firstName, lastName } = response.data.authorizedData.UserInfo;
      setUserName(`${firstName.slice(0, 1).toUpperCase()}${firstName.slice(1)}`);
      if (response.status === 403) localStorage.clear();
      return response.status === 200 ? setUserAuthStatus(true) : setUserAuthStatus(false);
    };
    if (userEmail && userToken) getUser();
    if (!userEmail || !userToken) {
      setUserName('');
      setUserAuthStatus(false);
    }
  }, [userEmail, userToken]);

  const handleLogOut = () => {
    setUserName('');
    setUserAuthStatus(false);
    localStorage.clear();
    history.push('/');
  };


  return (
    <Box
      margin={{
        horizontal: 'auto',
        top: 'xlarge',
      }}
      responsive
      width="medium"
      line-height="medium"
    >
      {userName
        ? (
          <h1>
            Hi.
            {' '}
            {userName}
          </h1>
        )
        : (
          <h1>
            Hi.
          </h1>
        )}
      <h2>
        This a personal App to keep track of jobs I
        have applied for, but you can use it too.
      </h2>
      <h3>
        It was built using React, Grommet, JSON Web Tokens, MongoDB,
        Node.js and Express.
      </h3>
      <Box
        margin="auto"
        direction="row"
      >
        {userAuthStatus
          ? (
            <>
              <Button
                margin="small"
                href="/myjobs"
                label="My Jobs"
              />
              <Button
                margin="small"
                onClick={() => handleLogOut()}
                label="Log Out"
              />
            </>
          )
          : (
            <>
              <Button
                margin="small"
                href="/register"
                label="Register"
              />
              <Button
                margin="small"
                href="/login"
                label="Log In"
              />
            </>
          )}
      </Box>
    </Box>
  );
};

Index.propTypes = {
  userEmail: PropTypes.string,
  userToken: PropTypes.string,
};

export default Index;
