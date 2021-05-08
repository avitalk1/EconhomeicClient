import React, {useState} from 'react';
import {View, Text, StyleSheet } from 'react-native';
import { Auth } from 'aws-amplify'
import { Input, Button} from 'react-native-elements';
import {handleDeivceForNotifications} from '../common/api'
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
      handleDeivceForNotifications(userInfo.email, "generate")
      navigation.navigate('INIT_ROUTING')
    }catch(err){
      console.log(err)
      navigation.navigate("LANDING_PAGE")
    }
  }
    return (
       <View style={styles.container}>
         <Text style={styles.SIPageTitle} >Sign In</Text>
         <View style={styles.InputContainer}>
        <Input
          placeholder="Email"
          onChangeText={value => handelInputChange('email', value)}
        />
        <Input
          placeholder="Password"
          onChangeText={value => handelInputChange('password', value)}
        />
      </View>
      <View style={styles.BtnContainer}>
      <Button
        title="Submit"
        onPress={handleSubmit}
      />
      </View>
       </View>
    );
}
const styles = StyleSheet.create({
    container: {
      marginTop:50, 
      display: 'flex',
      alignItems: 'center',
      height: "100%", 
    }, 
    InputContainer:{
      width:"80%"
    }, 
    BtnContainer:{
      marginTop:50, 
      width:"80%"
    }, 
    SIPageTitle:{
      marginBottom:20,
      fontSize:24,
    }
  });

export default SignIn