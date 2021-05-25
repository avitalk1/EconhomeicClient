import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux'
import { Auth } from 'aws-amplify'
import { Input, Button } from 'react-native-elements';
import { changeIsSignedInStatus, changeIsSignedInEmail } from '../Redux/actions/IsSignedInActions/action';
import { styles } from './styles'
import { handleDeivceForNotifications } from '../common/api'

function SignIn(props) {
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
      props.changeIsSignedInStatusFunc(1)
      props.changeIsSignedInEmailFunc(userInfo.email)
    } catch (err) {
      console.log(err)
      props.navigation.navigate("LANDING_PAGE")
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

const mapDispatchToProps = (dispatch) => ({
  changeIsSignedInStatusFunc: (status) => dispatch(changeIsSignedInStatus(status)), 
  changeIsSignedInEmailFunc: (email) => dispatch(changeIsSignedInEmail(email))
})
export default connect(null, mapDispatchToProps)(SignIn);