import React, { Component } from 'react';
import Firebase from 'firebase';
import { ChatBubble } from './components/ChatBubble';

class App extends Component {
    db = Firebase.database();
    messageRef = this.db.ref('/messages');

    state = {
        newMessage : '',
        messages: {},
        usernameInput: '',
        username: null
    };

    async componentWillMount() {
        this.messageRef.on('value', (value) => {
            this.setState({messages: value.val()});
        });

    }

    componentDidMount() {
        window.anchor = this.anchor;
        this.anchor.scrollIntoView({behavior: 'smooth'});
    }

    handleInput = (event) => {
        this.setState({[event.target.name]: event.target.value});
    }

    renderUsernameForm() {
        return (
            <div style={usernameFormStyle}>
                <img src={causeCodeLogoUrl} />
                <h1>Hey there.</h1>
                <h3>What's your name?</h3>
                <input
                        style={usernameTextInputStyle}
                        type="text"
                        name="usernameInput"
                        onChange={this.handleInput}
                        onKeyPress={(event) => event.key === 'Enter'
                                && this.setState({username: this.state.usernameInput})}
                />
                <br/><br/>
                <button style={buttonStyle} onClick={() => this.setState({username: this.state.usernameInput})}>
                    Start
                </button>
            </div>
        );
    }

    renderMessageArea = () => {
        const {messages} = this.state;

        return (
            <div style={messageAreaStyle}>
                {
                    messages && Object.keys(messages).map(key => {
                        return (
                            <div key={key}>
                                <ChatBubble message={messages[key]}/>
                            </div>
                        )
                    })
                }
                <div
                        style={{ float:"left", clear: "both" }}
                        ref={(anchor) => this.anchor = anchor}
                />
            </div>
        );
    }

    sendMessage = () => {
        const {username, newMessage} = this.state;

        this.messageRef.push({from: username, message: newMessage});
        this.anchor.scrollIntoView({behavior: 'smooth'});
        this.setState({newMessage: ''});
    }

    renderInputStrip() {
        return (
            <div style={inputStripStyle}>
                <input
                        style={{...usernameTextInputStyle, width: '70%'}}
                        type="text"
                        name="newMessage"
                        onChange={this.handleInput}
                        value={this.state.newMessage}
                        onKeyPress={(event) => {event.key === 'Enter' && this.sendMessage()}}
                />
                <button
                        style={{...buttonStyle, width: '15%'}}
                        onClick={this.sendMessage}
                >
                    Send
                </button>
            </div>
        );
    }

    render() {
        const {username} = this.state;

        return (
            <div style={containerStyle}>
                {!username && this.renderUsernameForm()}
                {this.renderMessageArea()}
                {this.renderInputStrip()}
            </div>
        );
    }
}

const containerStyle = {
    fontFamily: 'Open Sans',
    backgroundColor: '#efefef',
    width: '100%',
    height: '100%',
    position: 'fixed'
};

const messageAreaStyle = {
    width: '100%',
    height: '100%',
    backgroundColor: '#efefef',
    padding: '20px',
    overflowY: 'auto',
    marginBottom: '100px'
};

const usernameFormStyle = {
    zIndex: 100,
    position: 'fixed',
    backgroundColor: '#efefef',
    width: '100%',
    height: '100%',
    padding: '30px 15px',
    textAlign: 'center'
};

const usernameTextInputStyle = {
    borderRadius: '3px',
    padding: '5px 10px',
    border: '2px #f4b042 solid',
    outline: 'none',
    fontSize: '20px',
    fontFamily: 'Open Sans'
}

const buttonStyle = {
    backgroundColor: '#f4b042',
    color: 'white',
    border: '2px #e28e06 solid',
    borderRadius: '4px',
    fontSize: '14px',
    outline: 'none',
    padding: '8px 12px'
}

const inputStripStyle = {
    position: 'fixed',
    bottom: '0px',
    width: '100%',
    backgroundColor: '#fefefe',
    padding: '10px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly'
}

const causeCodeLogoUrl = 'https://image4.owler.com/logo/causecode-technologies_owler_20161118_153539_large.png';

export default App;
