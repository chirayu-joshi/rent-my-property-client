import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Dashboard from './Dashboard/Dashboard';
import SignOut from '../components/SignOut/SignOut';
import PageNotFound from '../components/PageNotFound/PageNotFound';
import asyncComponent from '../hoc/AsyncComponent';
const Host = asyncComponent(() => import('./Host/Host').then(module => module.default));
const SignIn = asyncComponent(() => import('./Form/SignIn').then(module => module.default));
const SignUp = asyncComponent(() => import('./Form/SignUp').then(module => module.default));

function App() {
  return (
    <Switch>
      <Route path="/host" component={Host} />
      <Route exact path="/signIn" component={SignIn} />
      <Route exact path="/signUp" component={SignUp} />
      <Route exact path="/signOut" component={SignOut} />
      <Route path="/" component={Dashboard} />
      <Route render={PageNotFound} />
    </Switch>
  );
}

export default App;
