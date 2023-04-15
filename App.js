import React, { useState } from 'react';
import { StatusBar, Dimensions, StyleSheet, Text, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Chatbot from 'react-chatbot-kit';
import 'react-chatbot-kit/build/main.css';
import config from './bot/config';
import MessageParser from './bot/MessageParser';
import ActionProvider from './bot/ActionProvider';

const Stack = createStackNavigator();

export default function App() {
  const [showChatbot, setShowChatbot] = useState(false);

  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

  const handleChatbotButtonPress = () => {
    setShowChatbot(true);
  };

  const LandingPage = () => {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Welcome to the Chatbot App</Text>
        <Button
          style={styles.buttonContainer}
          title="Start Chatbot"
          onPress={handleChatbotButtonPress}
        />
      </View>
    );
  };

  const ChatbotScreen = () => {
    return (
      <View style={[styles.container, { width: windowWidth, height: windowHeight }]}>
        <Chatbot config={config} messageParser={MessageParser} actionProvider={ActionProvider} />
      </View>
    );
  };

  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none">
        {showChatbot ? (
          <Stack.Screen name="Chatbot" component={ChatbotScreen} />
        ) : (
          <Stack.Screen name="Landing" component={LandingPage} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  buttonContainer: {
    backgroundColor: '#fff',
    alignSelf: 'flex-end',
  },
  preview: {
    alignSelf: 'stretch',
    flex: 1,
  },
});
