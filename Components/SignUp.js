import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Auth } from 'aws-amplify'
import { Input, Button} from 'react-native-elements';
function SignUp({ route, navigation }) {
  const [userInfo, setUserInfo] = useState({
    email: '',
    password: '',
    passswordConfirmation: ''
  })

  const handelInputChange = (field, value) => {
    let tempUserInfo = userInfo;
    tempUserInfo[field] = value;
    setUserInfo(tempUserInfo);
  }

  const handleSubmit = async () => { 
    try{
      const { user } = await Auth.signUp({
        username: userInfo.email,
        password: userInfo.password,
        attributes: {
          email:userInfo.email
        }
    });
      navigation.navigate('SUCONFIRM', {
        email: userInfo.email, 
        password: userInfo.password, 
        houseID: route.params.houseID
      })
    }catch(err){
      console.log(err)
    }
  }


  return (
    <View style={styles.container}>
      <Text>Sign up Screen</Text>
      <View>
        <Input
          placeholder="Email"
          onChangeText={value => handelInputChange('email', value)}
        />
        <Input
          placeholder="Password"
          onChangeText={value => handelInputChange('password', value)}
        />
        <Input
          placeholder="Password Confirmation"
          onChangeText={value => handelInputChange('passswordConfirmation', value)}
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

export default SignUp