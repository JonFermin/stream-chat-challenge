import React from 'react';
import { Link } from 'react-router-dom';
import * as ROUTES from '../constants/routes';

import 'stream-chat-react/dist/css/index.css';
const SignUpLink = () => (
  <p>
    Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
  </p>
);

const SignIn = () => (

      <div>
        <p> signin </p>
        <SignUpLink></SignUpLink>

      </div>
  );

export default SignIn;