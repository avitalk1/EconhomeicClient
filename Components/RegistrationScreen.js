import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
function RegistrationScreen({ route, navigation }) {
  return (
    <View style={styles.container}>
        <Text>Registration Screen</Text>
        <Text>{route.params.email}</Text>
        <Text>{route.params.houseID}</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    marginTop: 50
  }
});

export default RegistrationScreen