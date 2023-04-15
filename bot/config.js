import { createChatBotMessage } from 'react-chatbot-kit';
import DogPicture from '../components/DogPicture/DogPicture.jsx';
import SymptomsOptions from '../components/SymptomsOptions/SymptomsOptions.jsx';
import DurationOptions from '../components/DurationOptions/DurationOptions.jsx';

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
        {
            widgetName: 'durationOptions',
            widgetFunc: (props) => <DurationOptions {...props} />,
            props: {
                options: [
                    {
                        text: "Introduction to JS",
                        url:
                            "https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/basic-javascript/",
                        id: 1,
                    },
                    {
                        text: "Mozilla JS Guide",
                        url:
                            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide",
                        id: 2,
                    },
                    {
                        text: "Frontend Masters",
                        url: "https://frontendmasters.com",
                        id: 3,
                    },
                ],
            },
        }
    ],
};

export default config;