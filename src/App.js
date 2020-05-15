/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import {
  BrowserRouter as Router, Route, Switch, Link,
} from 'react-router-dom';
import { Box } from 'grommet';
import UserRegister from './components/UserRegister';
import NewJob from './components/NewJob';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          hi there this is the client side.
        </Route>
        <Route path="/userregister" component={UserRegister} />
        <Route path="/newjob" component={NewJob} />
      </Switch>
    </Router>
  );
}

export default App;
