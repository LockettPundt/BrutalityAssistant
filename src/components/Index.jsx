/* eslint-disable react/require-default-props */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import {
  Box, Anchor, Button, Text, Paragraph,
} from 'grommet';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import userAuth from '../utils/userAuth';

const Index = ({ userEmail, userToken, setUserToken }) => {
  const [userName, setUserName] = useState(false);
  const [userAuthStatus, setUserAuthStatus] = useState(false);
  const history = useHistory();

  useEffect(() => {
    const getUser = async () => {
      const response = await userAuth();

      if (response) {
        const { firstName, lastName } = response.data.authorizedData.UserInfo;
        setUserName(`${firstName.slice(0, 1).toUpperCase()}${firstName.slice(1)}`);
        setUserAuthStatus(true);
        history.push('/');
        return true;
      }
      return false;
    };
    getUser();
  }, [userEmail, userToken, history]);

  const handleLogOut = () => {
    setUserName('');
    setUserAuthStatus(false);
    localStorage.clear();
    history.push('/');
    setUserToken(null);
  };


  return (
    <Box
      margin={{
        horizontal: 'auto',
        top: 'small',
      }}

      responsive
      pad="medium"
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
      <Paragraph>
        <Text
          weight="bold"
          size="large"
        >
          This a personal App to keep track of jobs I
          have applied for, but you can use it too.
        </Text>
      </Paragraph>
      <Paragraph>
        <Text
          weight="normal"
        >
          It was built using React, Grommet, JSON Web Tokens, MongoDB,
          Node.js and Express.
        </Text>
      </Paragraph>

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
  setUserToken: PropTypes.func,
};

export default Index;
