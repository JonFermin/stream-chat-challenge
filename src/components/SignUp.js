import React, { Component } from 'react';
import { withFirebase } from '../controller/firecontext';
import { withRouter } from 'react-router-dom';

import { Link } from 'react-router-dom';
import * as ROUTES from '../constants/routes';

import { signupMongo } from '../controller/mongouser'

const SignUpLink = () => (
  <p>
    Already have an account? <Link to={ROUTES.SIGN_IN}>Sign In</Link>
  </p>
);

const SignUp = () => (
  <div>
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
        console.log(user);

        user.updateProfile({
          displayName: username,
          photoURL: image,
        })

        var obj = {
          uid: user.uid,
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
      <form onSubmit={this.onSubmit}>
        <input
          name="username"
          value={username}
          onChange={this.onChange}
          type="text"
          placeholder="Display Name"
          autoComplete="username"
        />
        <input
          name="email"
          value={email}
          onChange={this.onChange}
          type="text"
          placeholder="Email Address"
          autoComplete="email"
        />
        <input
          name="passwordOne"
          value={passwordOne}
          onChange={this.onChange}
          type="password"
          placeholder="Password"
          autoComplete="new-password"
        />
        <input
          name="passwordTwo"
          value={passwordTwo}
          onChange={this.onChange}
          type="password"
          placeholder="Confirm Password"
          autoComplete="new-password"
        />


        <input
          name="image"
          value={image}
          onChange={this.onChange}
          type="url"
          placeholder="Optional Image"
        />


        <button disabled={isInvalid} type="submit">
          Sign Up
        </button>

        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

const SignUpForm = withRouter(withFirebase(SignUpFormClass));

export default SignUp;

export { SignUpForm };