/* eslint-disable react/require-default-props */
import React from 'react';
import {
  Anchor, Nav, Text, Box, Image,
} from 'grommet';
import { Home, Logout } from 'grommet-icons';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import logo from './img/brutalLogo.jpg';

const Navbar = ({ token, setUserToken }) => {
  const history = useHistory();

  const handleLogOut = () => {
    setUserToken('');
    localStorage.clear();
    history.push('/');
  };

  return (
    <Nav
      pad="small"
      direction="row"
      align="center"
    >
      <Image
        margin={{
          left: 'small',
        }}
        height="55px"
        src={logo}
      />
      <Box
        direction="row"
        margin={{
          top: 'small',
        }}
      >
        <Anchor
          margin={{
            right: 'small',
          }}
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


      </Box>

    </Nav>
  );
};

Navbar.propTypes = {
  token: PropTypes.string,
  setUserToken: PropTypes.func,
};


export default Navbar;
