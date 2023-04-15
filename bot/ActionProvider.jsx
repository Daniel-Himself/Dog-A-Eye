import React from 'react';

const ActionProvider = ({ createChatBotMessage, setState, children }) => {
    
    const handlePhone = () => {
        const botMessage = createChatBotMessage("Thank you. Please enter your full name");
        setState((prev) => ({
            ...prev,
            messages: [...prev.messages, botMessage],
        }));
    };
    const handleName = () => {
        const botMessage = createChatBotMessage("Part 1 Complete!");
        setState((prev) => ({
            ...prev,
            messages: [...prev.messages, botMessage],
        }));
    };

    const handleUnknown = () => {
        const botMessage = createChatBotMessage("Sorry, I don't understand. Please try again");
        setState((prev) => ({
            ...prev,
            messages: [...prev.messages, botMessage],
        }));
    }

    const handleHello = () => {
        const botMessage = createChatBotMessage('Hello. Nice to meet you');
        
        setState((prev) => ({
            ...prev,
            messages: [...prev.messages, botMessage],
        }));
    };

    const handleDog = () => {
        const botMessage = createChatBotMessage(
            "Here's a nice dog picture for you!",
            {
                widget: 'dogPicture',
            }
        );

        setState((prev) => ({
            ...prev,
            messages: [...prev.messages, botMessage],
        }));
    };

    const handleTestMessages = () => {
        const botMessage = createChatBotMessage(
            "What symptoms is your dog experiencing?",
            {
                widget: 'symptomsOptions',
            }
        );
        
        setState((prev) => ({
            ...prev,
            messages: [...prev.messages, botMessage],
        }));
    };

    const handleSymptomsDuaration = () => {
        const message = createChatBotMessage(
            "How long has your dog been experiencing these symptoms?",
            {
                widget: 'symptomsDurationList',
            }
        );
        this.updateChatbotState(message);
    };

    updateChatbotState = (message) => {
        this.setState((prevState) => ({
            ...prevState,
            messages: [...prevState.messages, message],
        }));
    };

    // Put the handleHello function in the actions object to pass to the MessageParser
    return (
        <div>
            {React.Children.map(children, (child) => {
                return React.cloneElement(child, {
                    actions: {
                        handleHello,
                        handleDog,
                        handleTestMessages,
                        handleSymptomsDuaration,
                        handlePhone,
                        handleName,
                        handleUnknown,
                    },
                });
            })}
        </div>
    );
};

export default ActionProvider;