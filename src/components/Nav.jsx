/* eslint-disable react/require-default-props */
import React from 'react';
import { Anchor, Nav, Text } from 'grommet';
import { Home, Logout } from 'grommet-icons';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

const Navbar = ({ token, setUserToken }) => {
  const history = useHistory();

  const handleLogOut = () => {
    setUserToken('');
    localStorage.clear();
    history.push('/');
  };

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
      {token
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
  setUserToken: PropTypes.func,
};


export default Navbar;
