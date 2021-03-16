import React, {useState} from 'react';
import {View, Text, StyleSheet } from 'react-native';
import { Auth } from 'aws-amplify'
import { Input, Button} from 'react-native-elements';
function SignIn({ navigation }) {
  const [userInfo, setUserInfo] = useState({
    email: '',
    password: '',
  })

  const handelInputChange = (field, value) => {
    let tempUserInfo = userInfo;
    tempUserInfo[field] = value;
    setUserInfo(tempUserInfo);
  }

  const handleSubmit = async () => { 
    try{
      const user = await Auth.signIn(userInfo.email, userInfo.password)
      //const userInfo = await ...
      navigation.navigate('HOMEPAGE',{
        newUser:false
      })
    }catch(err){
      console.log(err)
    }
  }
    return (
       <View style={styles.container}>
         <Text>Sign IN Page</Text>
         <View>
        <Input
          placeholder="Email"
          onChangeText={value => handelInputChange('email', value)}
        />
        <Input
          placeholder="Password"
          onChangeText={value => handelInputChange('password', value)}
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

export default SignIn