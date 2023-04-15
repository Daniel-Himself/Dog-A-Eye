import { createChatBotMessage } from 'react-chatbot-kit';
import DogPicture from '../components/DogPicture/DogPicture.jsx';
import SymptomsOptions from '../components/SymptomsOptions/SymptomsOptions.jsx';

const botName = 'The DogVision Assistant';

const config = {
    initialMessages: [createChatBotMessage(`Hi! I'm ${botName}. Please enter your phone number to start`)],
    botName: botName,
    customStyles: {
        botMessageBox: {
            backgroundColor: '#376B7E',
        },
        chatButton: {
            backgroundColor: '#5ccc9d',
        },
    },
    customComponents: {
        // botAvatar: (props) => <DogPicture {...props} />,
        // userAvatar: (props) => <DogPicture {...props} />,
    },
    widgets: [
        {
            widgetName: 'dogPicture',
            widgetFunc: (props) => <DogPicture {...props} />,
        },
        {
            widgetName: 'symptomsOptions',
            widgetFunc: (props) => <SymptomsOptions {...props} />,
        },
    ],
};

export default config;