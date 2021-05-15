import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Auth } from 'aws-amplify'
import { Input, Button } from 'react-native-elements';
import { styles } from './styles'
import { handleDeivceForNotifications } from '../common/api'
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
    try {
      const user = await Auth.signIn(userInfo.email, userInfo.password)
      handleDeivceForNotifications(userInfo.email, "generate")
      navigation.navigate('INIT_ROUTING')
    } catch (err) {
      console.log(err)
      navigation.navigate("LANDING_PAGE")
    }
  }
  return (
    <View>
      <View style={[{ flexDirection: 'row', alignItems: 'center' }]}>
        <View style={styles.triangleCorner} />
        <View style={styles.triangleCornerTopRight} />
      </View>
      <View style={styles.container}>
        <Text style={styles.welcomeText} >Sign In</Text>
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
        <View style={styles.buttonContainer}>
          <Button
            buttonStyle={styles.button}
            title="Submit"
            onPress={handleSubmit}
          />
        </View>
      </View>
    </View>
  );
}

export default SignIn