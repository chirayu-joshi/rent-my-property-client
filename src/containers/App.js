import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';

import Dashboard from './Dashboard/Dashboard';
import SignIn from './Form/SignIn';
import SignUp from './Form/SignUp';
import PageNotFound from '../components/PageNotFound/PageNotFound';

function App() {
  return (
    <Fragment>
      <Switch>
        <Route exact path="/" component={Dashboard} />
        <Route exact path="/signIn" component={SignIn} />
        <Route exact path="/signUp" component={SignUp} />
        <Route render={PageNotFound} />
      </Switch>
    </Fragment>
  );
}

export default App;
