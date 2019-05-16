import React, { Component } from 'react';

import 'stream-chat-react/dist/css/index.css';


import { Redirect } from 'react-router-dom';
import * as ROUTES from '../constants/routes';

class Landing extends Component{
  state = {
    redirect: false
  }
  componentDidMount() {
    this.id = setTimeout(() => this.setState({ redirect: true }), 0)
  }
  render (){
      return this.state.redirect
      ? <Redirect to={ROUTES.SIGN_IN} />
      : <div className="lds-wrapper"><div className="lds-ripple"><div></div><div></div></div></div>

      
  }
} 

export default Landing;

