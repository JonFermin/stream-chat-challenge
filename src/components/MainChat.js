import React, { Component } from 'react';
import { Chat, Channel, ChannelHeader, Window, ChannelList } from 'stream-chat-react';
import { MessageList, MessageInput, MessageLivestream } from 'stream-chat-react';
import { Thread } from 'stream-chat-react';
import { StreamChat } from 'stream-chat';
import { Link } from 'react-router-dom';
import { withFirebase } from '../controller/firecontext';
import { withRouter } from 'react-router-dom';

import SignOut from './SignOut';
import 'stream-chat-react/dist/css/index.css';

import * as ROUTES from '../constants/routes';
import { Button, ListGroup, ListGroupItem } from "shards-react";


class MyChannelPreview extends Component {
    render() {
        const {setActiveChannel, channel, unread} = this.props;
        return (
            <div>
                <div className="ChannelPreview">
                    <ListGroup>
                        <a href="#" onClick={(e) => setActiveChannel(channel, e)}>
                            <ListGroupItem className="ListItem">
                            {channel.data.name}
                            <div className="unread">Unread messages: {unread}</div>
                            </ListGroupItem>
                        </a>
                    </ListGroup>
                    
                </div>
                <hr></hr>
                <SignOut></SignOut>
            </div>
      );
    }
  }

class MainChat extends Component {

    handleOnSubmit = () => {
        this.props.history.push(`/dashboard`);
        };
    render(){
        if (this.props.location.state == null){
            return(
                <div className="formContainer">
                <h4> Please sign in  </h4>
                <br></br>
                <Link to={ROUTES.SIGN_IN}>
                <Button type="submit">
                    Sign In
                </Button>
                </Link>

                </div>
                )
        } else {
            
            var user = this.props.location.state;
            const chatClient = new StreamChat('zhr2pb4w5ub6');

            console.log(user);

            chatClient.setUser(
                {
                id: user.id,
                name: user.name,
                image: user.image
                },
                user.userToken,
            );
  
            const filters = {};
            const sort = { last_message_at: -1 };
            const channels = chatClient.queryChannels(filters, sort).then((result) => {
                console.log(result);
            });
            console.log(channels);
   
            return(
                <div className="ChatContainer">
                    <Chat client={chatClient} theme={'messaging light'}>
                        <ChannelList channels={channels} Preview={MyChannelPreview} />
                        <Channel Message={MessageLivestream}>
                        <Window>
                            <ChannelHeader />
                            <MessageList />
                            <MessageInput />
                        </Window>
                        <Thread />
                        </Channel>
                    </Chat>
                </div>
                              
            );
        }
    }
  }



export default withRouter(withFirebase(MainChat));