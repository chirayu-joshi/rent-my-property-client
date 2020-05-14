import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Dashboard from './Dashboard/Dashboard';
import Host from './Host/Host';
import SignIn from './Form/SignIn';
import SignUp from './Form/SignUp';
import SignOut from '../components/SignOut/SignOut';
import PageNotFound from '../components/PageNotFound/PageNotFound';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={Dashboard} />
      <Route path="/host" component={Host} />
      <Route exact path="/signIn" component={SignIn} />
      <Route exact path="/signUp" component={SignUp} />
      <Route exact path="/signOut" component={SignOut} />
      <Route render={PageNotFound} />
    </Switch>
  );
}

export default App;
