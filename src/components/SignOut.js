import React, { Component } from 'react';

import { withFirebase } from './firecontext';
import { withRouter } from 'react-router-dom';


import * as ROUTES from '../constants/routes';


class SignOut extends Component {
    render () {
        return(
            <button type="button" onClick={()=> {
                this.props.firebase.doSignOut()
                .then(() => {
                    console.log(this.props.firebase.auth.currentUser);
                    this.props.history.push(ROUTES.SIGN_IN);
                  })
                  .catch(error => {
                    this.setState({ error });
                  });
                
                }}>
                Sign Out
            </button>
        ) ;
    }
}

export default withRouter(withFirebase(SignOut));