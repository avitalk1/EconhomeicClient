import React, {useState} from 'react';
import {View, Text, StyleSheet } from 'react-native';
import { Auth } from 'aws-amplify'
import { Input, Button} from 'react-native-elements';
import { getUserInfo } from '../common/api'
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
      getUserInfo(userInfo.email).then(result => {
        if ('Expenses' in result.user){
          navigation.navigate('MAIN_STATISTICS_PAGE',{
            userInfo: result
          })
        }else{
          navigation.navigate('HOMEPAGE',{
            newUser:false,
            userInfo: result
          })
        }
      })
      
    }catch(err){
      console.log(err)
      navigation.navigate("LANDING_PAGE")
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