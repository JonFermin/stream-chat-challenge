import React from 'react';

import { Chat, Channel, ChannelHeader, Window } from 'stream-chat-react';
import { MessageList, MessageInput, MessageLivestream } from 'stream-chat-react';
import { MessageInputSmall, Thread } from 'stream-chat-react';
import { StreamChat } from 'stream-chat';

import SignOut from './SignOut';

import 'stream-chat-react/dist/css/index.css';

function MainChat(){
    
    const chatClient = new StreamChat('zhr2pb4w5ub6');

    const userToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiZGV2ZWxvcG1lbnQifQ.wSZkPFCg5nv7iuaeS1LmfrwtoKm0cQpT3mSb8nuYSGM';

    chatClient.setUser(
        {
        id: 'development',
        name: 'Broken limit',
        image: 'https://getstream.io/random_svg/?id=broken-limit-4&name=Broken+limit'
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
    );
}

export default MainChat;