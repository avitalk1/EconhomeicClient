import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
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