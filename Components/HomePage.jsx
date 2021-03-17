import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Input, Button} from 'react-native-elements';
import Amplify, { API } from 'aws-amplify';
import awsconfigsclient from '../common/aws-configs'
Amplify.configure(awsconfigsclient);
function HomePage({ route, navigation }) {

  return (
    <View style={styles.container}>
      <Text>Home Page</Text>
      {
        route.newUser ? 
        <Text>hello you are a new user</Text> 
        : 
        <Text>Hello you are not a new user - but no statistics to show</Text>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 100
  }
  
});

export default HomePage;