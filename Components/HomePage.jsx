import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Input, Button} from 'react-native-elements';
import {testingLambda} from '../common/api'
import Amplify, { API } from 'aws-amplify';
import awsconfigsclient from '../common/aws-configs'
Amplify.configure(awsconfigsclient);
function HomePage({ route, navigation }) {

  return (
    <View style={styles.container}>
      <Text>Home Page</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 100
  }
  
});

export default HomePage;