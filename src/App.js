/* eslint-disable react/jsx-filename-extension */
import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router, Route, Switch,
} from 'react-router-dom';
import { Grommet } from 'grommet';
import axios from 'axios';
import UserRegister from './components/UserRegister';
import NewJob from './components/NewJob';
import LogIn from './components/LogIn';
import API_URL from './utils/appUtils';

function App() {
  const [userEmail, setUserEmail] = useState(localStorage.getItem('userEmail') || null);
  const [userToken, setUserToken] = useState(localStorage.getItem('token') || null);
  useEffect(() => {
    console.log(localStorage.getItem('userEmail'));
    console.log(localStorage.getItem('token'));
    const verifyUser = async () => {
      const tokenToVerify = await axios.post(`${API_URL}userauth`, { userEmail, userToken });
      console.log(tokenToVerify);
    };
    return () => verifyUser();
  }, [userEmail, userToken]);

  return (
    <Grommet>
      <Router>
        <Switch>
          <Route exact path="/">
            hi there this is the client side.
          </Route>
          <Route path="/register" component={() => <UserRegister setUserEmail={setUserEmail} setUserToken={setUserToken} />} />
          <Route path="/newjob" component={NewJob} />
          <Route path="/login" component={() => <LogIn setUserEmail={setUserEmail} setUserToken={setUserToken} />} />
        </Switch>
      </Router>
    </Grommet>
  );
}

export default App;
