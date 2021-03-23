import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Auth } from 'aws-amplify'
import { Button} from 'react-native-elements';
import {handleDeivceForNotifications} from '../common/api'

import { useNavigation } from '@react-navigation/native';
function Logout() {

  const handleSubmit = async () => { 
    const navigation = useNavigation();
    try{    
      Auth.currentAuthenticatedUser()
        .then(user => {
            handleDeivceForNotifications(user.attributes.email, "deactivate")
        })
      await Auth.signOut()
     navigation.navigate('LANDING_PAGE')
    }catch(err){
      console.log(err)
    }
  }
  return (
    <View style={styles.container}>
      <Text>Logout</Text>
      <Button
        title="Logout"
        onPress={handleSubmit}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    marginTop: 50
  }
});

export default Logout