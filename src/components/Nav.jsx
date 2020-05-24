import React, { useState, useEffect } from 'react';
import { Anchor, Nav, Text } from 'grommet';
import { Home, Logout } from 'grommet-icons';
import { useHistory } from 'react-router-dom';


const Navbar = () => {
  const [userToken, setUserToken] = useState(!!localStorage.getItem('token'));
  const history = useHistory();


  const handleLogOut = () => {
    setUserToken(false);
    localStorage.clear();
    history.push('/');
  };

  useEffect(() => {
    console.log('hi');
    setUserToken(!!localStorage.getItem('token'));
  });

  return (
    <Nav
      direction="row"
      align="center"
    >
      <Text
        color="#CCCCCC"
        weight="900"
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


export default Navbar;
