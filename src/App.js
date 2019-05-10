import React from 'react';

import { BrowserRouter as Router, Route } from 'react-router-dom';

import MainNavigator from './navigation/MainNavigator';
import Landing from './components/Landing';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import MainChat from './components/MainChat';


import * as ROUTES from './constants/routes';

const App = () => (
  <Router>
    <div>
      <MainNavigator />

      <hr />

      <Route exact path={ROUTES.LANDING} component={Landing} />
      <Route path={ROUTES.SIGN_UP} component={SignUp} />
      <Route path={ROUTES.SIGN_IN} component={SignIn} />
      <Route path={ROUTES.HOME} component={MainChat} />

    </div>
  </Router>
);

export default App;
