import React, { Fragment } from 'react';
import { Link, Route, Switch } from 'react-router-dom';

import SignIn from './SignIn/SignIn';
import SignUp from './SignUp/SignUp';

function App() {
  return (
    <Fragment>
      <Link to="/signIn">Sign In</Link>
      <Link to="/signUp">Sign Up</Link>
      <Switch>
        <Route exact path="/signIn" component={SignIn} />
        <Route exact path="/signUp" component={SignUp} />
      </Switch>
    </Fragment>
  );
}

export default App;
