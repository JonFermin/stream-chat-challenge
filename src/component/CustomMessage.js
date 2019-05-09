import React from 'react';

// a very minimalistic message component
class CustomMessage extends React.Component {
  render() {
    return <div><b>{this.props.message.user.name}</b> {this.props.message.text}</div>;
  }
}

export default CustomMessage;