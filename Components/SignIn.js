import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux'
import { Auth } from 'aws-amplify'
import { Input, Button } from 'react-native-elements';
import { changeIsSignedInStatus, changeIsSignedInEmail } from '../Redux/actions/IsSignedInActions/action';
import { styles } from './styles'
import { handleDeivceForNotifications } from '../common/api'
import { Entypo } from '@expo/vector-icons';

function SignIn(props) {
  const [userInfo, setUserInfo] = useState({
    email: '',
    password: '',
  })
  const [eyeIcon, seteyeIcon] = useState("eye-with-line")
  const [passwordShow, setpasswordShow] = useState(true)
  const [inputInvaidMsg, setInputInvaidMsg] = useState(false)
  const changeIcon = async () => {
    let temp = eyeIcon === "eye-with-line" ? "eye" : "eye-with-line";
    let pass = !passwordShow;
    setpasswordShow(pass);
    seteyeIcon(temp)
  }

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
      setInputInvaidMsg(true)
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
            rightIcon={
              <Entypo name="mail" size={24} color="#8f8f8f" />
            }
          />
          <Input
            placeholder="Password"
            onChangeText={value => handelInputChange('password', value)}
            secureTextEntry={passwordShow}
            rightIcon={
              <Entypo name={eyeIcon} size={24} color="#8f8f8f" onPress={() => changeIcon()} />
            }
          />
        </View>
        {
          inputInvaidMsg ? 
          <View style={styles.errorContainer}> 
            <Text style={styles.errormsg}>You have entered an invalid email or password</Text>
          </View> : <></>
        }
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