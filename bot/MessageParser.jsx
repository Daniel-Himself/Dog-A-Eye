import React from 'react';

const MessageParser = ({ children, actions }) => {
    const parse = (message) => {
        if (message.includes('hello')) {
            actions.handleHello();
        }
        else if (message.includes('test dog picture')) {
            actions.handleDog();
        }
        else if (message.match(/^(0\d{1,2})-?(\d{7})$/)) {
            actions.handlePhone(message);
        }
        else if (message.match(/^([a-zA-Z]{2,}\s*)+$/) && message.length < 20) {
            actions.handleSymptomsOptions(message);
        }
        else if (message.includes('w1sw1w1w1')) {
            actions.handleDurationOptions(message);
        } else {
            actions.handleUnknown();
        }
    };

    return (
        <div>
            {React.Children.map(children, (child) => {
                return React.cloneElement(child, {
                    parse: parse,
                    actions,
                });
            })}
        </div>
    );
};

export default MessageParser;