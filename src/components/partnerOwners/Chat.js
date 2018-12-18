import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ThemeProvider, ChatList, ChatListItem, Avatar, Column, Row, Title, Subtitle, MessageList,
     MessageGroup, Message, MessageText, TextComposer, IconButton, AddIcon, EmojiIcon,
    TextInput, SendButton } from '@livechat/ui-kit';
import '../../css/bootstrap.css';
import '../../css/chat.css';

//////////////////////////////////////////////////////////////////////////////////////////
// referece for chat is https://developers.livechatinc.com/docs/react-chat-ui-kit/
//////////////////////////////////////////////////////////////////////////////////////////

const styles = theme => ({
    root: {
        margin: 'auto',
        color: '#979797',
        width: 494,
        padding: 30,
        boxSizing: 'border-box',
        textAlign: 'center',
        [theme.breakpoints.down('sm')]: {
            width: 300,
        },
    },
    label: {
        fontSize: 36,
    },
    between: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    secondary: {
        fontSize: 14,
        color: '#CECECE',
    },
    dataField: {
        display: 'flex',
        margin: '20px 0'
    },
    mainData: {
        flex: '1 1 70%', textAlign: 'left',
        fontWeight: 'bold',
        fontSize: 18,
    },
    secondaryLabel: { flex: '1 1 30%', textAlign: 'left' },
    hr: {
        border: '0.5px solid #CECECE',
        height: 0,
    },
    defaultLink: {
        color: '#25AAE1',
        textDecoration: 'none',
    },
    btn: {
        width: 260,
        height: 60,
        margin: '30px 0',
        marginBottom: 50,
        backgroundColor: '#88C601',
        color: theme.palette.common.white,
        alignSelf: 'center',
        '&:hover': { backgroundColor: '#7BB203' },
    }
})

const FakeChatList = [
    {
        id : 1,
        img: 'https://harpygle-partners.s3.ap-south-1.amazonaws.com/partners/harpygle-par-8p14lvjb3ncjps1z54n/picture.jpg',
        name: 'Mohammad Samy',
        message: 'Hello, how can I help you? We have a lot to talk about',
    },
    {
        id: 2,
        img: 'https://harpygle-partners.s3.ap-south-1.amazonaws.com/partners/harpygle-par-8p14lvjb3ncjps1z54n/picture.jpg',
        name: 'Mohammad Samy',
        message: 'Hello, how can I help you? We have a lot to talk about',
    },
    {
        id: 3,
        img: 'https://harpygle-partners.s3.ap-south-1.amazonaws.com/partners/harpygle-par-8p14lvjb3ncjps1z54n/picture.jpg',
        name: 'Mohammad Samy',
        message: 'Hello, how can I help you? We have a lot to talk about',
    }
]

class Chats extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }

    }

    renderChatLists = (chatList) => {
        return (
            <ChatListItem>  {/* //acttive */}
                <Avatar style={{width:70, height:50}} imgUrl={chatList.img} />
                <Column fill>
                    <Row justify>
                        <Title ellipsis>{chatList.name}</Title>
                        <Subtitle nowrap></Subtitle>
                    </Row>
                    <Subtitle ellipsis>
                        {chatList.message}
                    </Subtitle>
                </Column>
            </ChatListItem>
        );
    }

    render() {
        const { classes } = this.props;
        return (
            <ThemeProvider>
                <div className="row m-0">
                    <div className="col-4 p-0 chatList">
                        <ChatList>
                            {FakeChatList.map(chatList => {
                                return this.renderChatLists(chatList);
                            })}
                        </ChatList>
                    </div>
                    <div className="col-8 p-0 chatList position-relative">
                        <MessageList active>
                            
                            <MessageGroup onlyFirstWithMeta>
                                <Message className="messageWidth" date="21:38" isOwn={true} >
                                    <MessageText className="sentMessage">
                                    I love them
                                    </MessageText>
                                </Message>
                                <Message className="messageWidth" date="21:38" isOwn={true} authorName="Visitor">
                                    <MessageText  className="sentMessage">This helps me a lot</MessageText>
                                </Message>
                            </MessageGroup>
                            <MessageGroup onlyFirstWithMeta>
                                <Message className="messageWidth" date="21:37">
                                    <MessageText className="recievedMessage">No problem!</MessageText>
                                </Message>
                                <Message className="messageWidth" date="21:39">
                                    <MessageText className="recievedMessage">
                                    The fastest way to help your customers - start chatting with visitors
                                    who need your help using a free 30-day trial.
                                    </MessageText>
                                </Message>
                            </MessageGroup>
                        </MessageList>
                        <TextComposer className="textComposerArea" defaultValue="Hello, can you help me?">
                            <Row align="center">
                                <IconButton fit>
                                <AddIcon />
                                </IconButton>
                                <TextInput fill />
                                <SendButton fit />
                            </Row>

                            <Row verticalAlign="center" justify="right">
                                <IconButton fit>
                                <EmojiIcon />
                                </IconButton>
                            </Row>
                        </TextComposer>
                    </div>
                </div>
            </ThemeProvider>
        );
    }
}

Chats.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(connect(
    state => ({
        user: state.loginData.user,
    }),
)(Chats));