import React, { Component } from 'react';

import { withFirebase } from '../controller/firecontext';
import { withRouter } from 'react-router-dom';


import * as ROUTES from '../constants/routes';
import { Button } from "shards-react";



class SignOut extends Component {
    render () {
        return(
            <Button type="button" onClick={()=> {
                this.props.firebase.doSignOut()
                .then(() => {
                    this.props.history.push(ROUTES.SIGN_IN);
                  })
                  .catch(error => {
                    this.setState({ error });
                  });
                
                }}>
                Sign Out
            </Button>
        ) ;
    }
}

export default withRouter(withFirebase(SignOut));