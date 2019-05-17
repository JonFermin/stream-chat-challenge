import React, { Component } from 'react';
import { withFirebase } from '../controller/firecontext';
import { Link, withRouter } from 'react-router-dom';

import * as ROUTES from '../constants/routes';

import { signupMongo } from '../controller/mongouser'

import { Form, FormInput, Button } from "shards-react";

import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css";

import "../constants/scss/Main.scss";


const SignUpLink = () => (
  <p>
    Already have an account? <Link to={ROUTES.SIGN_IN}>Sign In</Link>
  </p>
);

const SignUp = () => (
  <div className="formContainer">
    <h1>SignUp</h1>
    <SignUpForm />
    <SignUpLink />
  </div>
);

const INITIAL_STATE = {
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  image: '',
  error: null,
};

class SignUpFormClass extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { username, email, passwordOne, image } = this.state;

    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        this.setState({ ...INITIAL_STATE });

        // Push user variable to MongoDB on feature/aws-lambda-connection
        var user = this.props.firebase.auth.currentUser

        var obj = {
          email,
          id: user.uid,
          username,
          image,
        }

        signupMongo(obj);
        this.props.history.push(ROUTES.SIGN_IN);

      })
      .catch(error => {
        this.setState({ error });
      });

    event.preventDefault();
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const {
      username,
      email,
      passwordOne,
      passwordTwo,
      error,
      image
    } = this.state;

    const isInvalid =
    passwordOne !== passwordTwo ||
    passwordOne === '' ||
    email === '' ||
    username === '';

    return (
      <Form onSubmit={this.onSubmit}>
        <label htmlFor="#username">Username</label>
        <FormInput
          name="username"
          value={username}
          onChange={this.onChange}
          type="text"
          placeholder="Display Name"
          autoComplete="username"
        />
        <label htmlFor="#email">Email</label>
        <FormInput
          name="email"
          value={email}
          onChange={this.onChange}
          type="text"
          placeholder="Email Address"
          autoComplete="email"
        />
        <label htmlFor="#passwordOne">Password</label>
        <FormInput
          name="passwordOne"
          value={passwordOne}
          onChange={this.onChange}
          type="password"
          placeholder="Password"
          autoComplete="new-password"
        />
        <label htmlFor="#passwordTwo">Retype Password</label>
        <FormInput
          name="passwordTwo"
          value={passwordTwo}
          onChange={this.onChange}
          type="password"
          placeholder="Confirm Password"
          autoComplete="new-password"
        />

        <label htmlFor="#image">Optional Image URL</label>

        <FormInput
          name="image"
          value={image}
          onChange={this.onChange}
          type="url"
          placeholder="Optional Image"
        />


        <Button disabled={isInvalid} type="submit">
          Sign Up
        </Button>

        {error && <p>{error.message}</p>}
      </Form>
    );
  }
}

const SignUpForm = withRouter(withFirebase(SignUpFormClass));

export default SignUp;

export { SignUpForm };