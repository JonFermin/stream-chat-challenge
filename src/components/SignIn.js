import React, { Component } from 'react';
import { withFirebase } from '../controller/firecontext';
import { Link, withRouter } from 'react-router-dom';
import * as ROUTES from '../constants/routes';

import { FormInput, FormGroup, Form, Button } from "shards-react";

import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css"


import {grabUserMongo} from '../controller/mongouser'

const SignUpLink = () => (
  <p>
    Don't have an account? 
    <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
  </p>
);

const SignIn = () => (
      <div className="formContainer">
        <h1>Sign In</h1>
        <SignInForm />
        <SignUpLink />
      </div>
  );

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};

export class SignInFormClass extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { email, password } = this.state;
    

    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        let user = this.props.firebase.auth.currentUser;
        grabUserMongo(user.uid).then((result) => {
          console.log(result);
          this.props.history.push({
            pathname: ROUTES.HOME,
            state: result.mongoResult 
          });
        });;
        
      })
      .catch(error => {
        this.setState({ error });
      });
    if (event) {
      event.preventDefault();
    }
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { email, password, error } = this.state;
    const isInvalid = password === '' || email === '';
    return (
      <div className = "formContainer">
      <Form onSubmit={this.onSubmit}>
        <FormGroup>
          <label htmlFor="#username">Email</label>
          <FormInput
            id="email-input"
            name="email"
            value={email}
            onChange={this.onChange}
            type="text"
            placeholder="johndoe@gmail.com"
            autoComplete="email"
          />
        </FormGroup>
        
        <FormGroup>
          <label htmlFor="#password">Password</label>
          <FormInput
            id="pass-input"
            name="password"
            value={password}
            onChange={this.onChange}
            type="password"
            placeholder="Password"
            autoComplete="password"
          />
        </FormGroup>
        
        <Button id="submit-login" disabled={isInvalid} type="submit">
          Sign In
        </Button>

        {error && <p>{error.message}</p>}
      </Form>
      </div>
    );
  }
}

const SignInForm = withRouter(withFirebase(SignInFormClass));



export default SignIn;