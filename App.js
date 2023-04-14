import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Chatbot from 'react-chatbot-kit'
// import 'react-chatbot-kit/build/main.css'
import config from './bot/config'
import MessageParser from './bot/MessageParser'
import ActionProvider from './bot/ActionProvider'
import ShareCamera from './components/ShareCamera/ShareCamera.jsx'
export default function App() {

  return (
    <ShareCamera />
    // <div className='App'>
    //     {/* <Chatbot
    //       config={config}
    //       messageParser={MessageParser}
    //       actionProvider={ActionProvider}
    //     /> */}
    // </div>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
