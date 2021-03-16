import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Auth } from 'aws-amplify'
import { Input, Button} from 'react-native-elements';
function SignupConfirmation( { route, navigation } ) {
  const [confiramtionCode, setConfiramtionCode] = useState('')
  const handleSubmit = async () => { 
    try{
     const { email, password, houseID } = route.params
      await Auth.confirmSignUp(email, confiramtionCode, { forceAliasCreation: true })
      const user = await Auth.signIn(email, password)
      navigation.navigate('USERFORM', {
          email:email, 
          houseID: houseID
      })
    }catch(err){
      console.log(err)
    }
  }
  return (
    <View style={styles.container}>
      <Text>Signup Confirmation Screen</Text>
      <View>
        <Input
          placeholder="Password Confirmation Code"
          onChangeText={value => setConfiramtionCode(value)}
        />
      </View>
      <Button
        title="Submit"
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

export default SignupConfirmation