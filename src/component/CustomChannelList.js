import React from 'react';

// custom channel preview component
class CustomChannelList extends React.Component {
  render() {
      const {setActiveChannel, channel, unread} = this.props;
      return (
      <div className="channel_preview">
        <a href="#" onClick={(e) => setActiveChannel(channel, e)}>
          {channel.data.name}
        </a>

        <span>
          Unread messages: {unread}
        </span>
      </div>
    );
  }
}

export default CustomChannelList;

