import React from 'react';
import ReactDOM from 'react-dom';
import MainChat from '../MainChat';




const defaultProps = {  
    location: {
        state:{
            "_id": "5cdcd531bc659a5efe43d0e5",
            "userToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiUGtZc2JKVWhaTlhXdjUzV3gxYXNZaFJWSE10MSJ9.bqhsGCQdahIE2EENfl_QXhRUgldUb4IsbInBIOjHgQE",
            "id": "PkYsbJUhZNXWv53Wx1asYhRVHMt1",
            "name": "jenny",
            "email": "jen@jen.com",
            "image": ""
          }
    }
};



it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MainChat 
        {...defaultProps}
  />, div);
  ReactDOM.unmountComponentAtNode(div);
});
