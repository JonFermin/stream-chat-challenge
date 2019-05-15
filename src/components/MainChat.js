import React, { Component } from 'react';

import { Chat, Channel, ChannelHeader, Window } from 'stream-chat-react';
import { MessageList, MessageInput, MessageLivestream } from 'stream-chat-react';
import { MessageInputSmall, Thread } from 'stream-chat-react';
import { StreamChat } from 'stream-chat';

import { Link } from 'react-router-dom';
import * as ROUTES from '../constants/routes';

import { withFirebase } from '../controller/firecontext';
import { withRouter } from 'react-router-dom';

import SignOut from './SignOut';

import 'stream-chat-react/dist/css/index.css';

class MainChat extends Component {
    render(){
        if (this.props.firebase.auth.currentUser == null){
            return(
                <p>
                Please sign in <Link to={ROUTES.SIGN_IN}>Sign In</Link>
                </p>
                )
        } else {
            const chatClient = new StreamChat('zhr2pb4w5ub6');

            const userToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiZGV2ZWxvcG1lbnQifQ.wSZkPFCg5nv7iuaeS1LmfrwtoKm0cQpT3mSb8nuYSGM';

            console.log(this.props.location.state)

            var user = this.props.location.state;
            chatClient.setUser(
                {
                id: user.id,
                name: user.name,
                image: user.image
                },
                userToken,
            );
            
            

            const channel = chatClient.channel('livestream', 'spacex', {
                image: 'https://goo.gl/Zefkbx',
                name: 'SpaceX launch discussion',
            });

            // let state = channel.watch();


            channel.on('message.new', event => {
                console.log('received a new message', event.message.text);
                console.log(`Now have ${channel.state.messages.length} stored in local state`);
            });
            return(
                <div>
                    <Chat client={chatClient} theme={'livestream dark'}>
                        
                        <Channel channel={channel} Message={MessageLivestream}>
                        <Window hideOnThread>
                            <SignOut></SignOut>
    
                            <ChannelHeader live />
                            <MessageList />
                            <MessageInput Input={MessageInputSmall} focus />
                        </Window>
                        <Thread fullWidth />
                        </Channel>
                    </Chat>
                </div>
                
            );
        }
    }
  }



export default withRouter(withFirebase(MainChat));