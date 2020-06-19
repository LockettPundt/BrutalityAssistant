/* eslint-disable react/require-default-props */
import React, { useState, useEffect } from 'react';
import { Anchor, Nav, Text } from 'grommet';
import { Home, Logout } from 'grommet-icons';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';


const Navbar = ({ token }) => {
  const [userToken, setUserToken] = useState(token);
  const history = useHistory();


  const handleLogOut = () => {
    setUserToken(false);
    localStorage.clear();
    history.push('/');
  };

  useEffect(() => () => setUserToken(!!localStorage.getItem('token')), [token]);

  return (
    <Nav
      direction="row"
      align="center"
    >
      <Text
        color="white"
        weight="bold"
        margin={{
          left: 'small',
        }}
      >
        Brutality Assistant
      </Text>
      <Anchor
        icon={<Home />}
        href="/"
      />
      {userToken
        ? (
          <Anchor
            icon={<Logout />}
            onClick={handleLogOut}
          />
        )
        : null}
    </Nav>
  );
};

Navbar.propTypes = {
  token: PropTypes.string,
};


export default Navbar;
