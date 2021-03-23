import { StatusBar } from 'expo-status-bar';
import React from 'react';
//import { StyleSheet, Text, View , Button} from 'react-native';
import Amplify , {Analytics, Auth}from 'aws-amplify';
import awsconfigsclient from './common/aws-configs'
import AppNavigation from './Components/AppNavigation'
Analytics.record({name: "EconhomeicVisit"})
Amplify.configure(awsconfigsclient);

function App() {
  return (
    <>
      <AppNavigation/>
      </>
  )
}


export default App
