import React from 'react';

export class ChatBubble extends React.Component {
    render() {
        const {message} = this.props;

        return (
            <span style={chatBubbleStyle}>
                <div style={fromStyle}>
                    <b>{message.from}</b> says:
                </div>
                <div style={messageStyle}>
                    {message.message}
                </div>
            </span>
        );
    }
}

const chatBubbleStyle = {
    border: '2px #e28e06 solid',
    borderRadius: '4px',
    display: 'inline-block',
    backgroundColor: '#f4b042',
    position: 'relative',
    marginBottom: '10px',
    padding: '20px'
};

const messageStyle = {
    fontSize: '20px',
    color: 'white'
};

const fromStyle = {
    fontSize: '12px',
    color: 'black'
};