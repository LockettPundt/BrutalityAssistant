/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import {
  BrowserRouter as Router, Route, Switch,
} from 'react-router-dom';
import { Grommet } from 'grommet';
import UserRegister from './components/UserRegister';
import NewJob from './components/NewJob';
import LogIn from './components/LogIn';


function App() {
  return (
    <Grommet>
      <Router>
        <Switch>
          <Route exact path="/">
            hi there this is the client side.
          </Route>
          <Route path="/register" component={UserRegister} />
          <Route path="/newjob" component={NewJob} />
          <Route path="/login" component={LogIn} />
        </Switch>
      </Router>
    </Grommet>
  );
}

export default App;
