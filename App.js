import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { withAuthenticator } from 'aws-amplify-react-native';
import Amplify from 'aws-amplify';
import awsconfigsclient from './common/aws-configs'
import AppNavigation from './Components/AppNavigation'
Amplify.configure(awsconfigsclient);
function App() {
  return (
    <>
      <AppNavigation/>
    </>
  )
}


export default App
