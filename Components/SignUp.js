import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Auth } from 'aws-amplify'
import { Input, Button } from 'react-native-elements';
import { styles } from './styles'
import { Entypo } from '@expo/vector-icons';

function SignUp({ route, navigation }) {
  const [userInfo, setUserInfo] = useState({
    email: '',
    password: '',
    passswordConfirmation: ''
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
      const { user } = await Auth.signUp({
        username: userInfo.email,
        password: userInfo.password,
        attributes: {
          email: userInfo.email
        }
      });
      navigation.navigate('SUCONFIRM', {
        email: userInfo.email,
        password: userInfo.password,
        houseID: route.params.houseID
      })
    } catch (err) {
      console.log(err)
      setInputInvaidMsg(true)
    }
  }


  return (
    <View>
      <View>
        <View style={[{ flexDirection: 'row', alignItems: 'center' }]}>
          <View style={styles.triangleCorner} />
          <View style={styles.triangleCornerTopRight} />
        </View>
        <View style={styles.container}>
          <Text style={styles.welcomeText} >Sign Up</Text>
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
              secureTextEntry={passwordShow}
              onChangeText={value => handelInputChange('password', value)}
              rightIcon={
                <Entypo name={eyeIcon} size={24} color="#8f8f8f" onPress={() => changeIcon()} />
            }
            />
            <Input
              placeholder="Password Confirmation"
              secureTextEntry={passwordShow}
              onChangeText={value => handelInputChange('passswordConfirmation', value)}
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
    </View>
  );
}


export default SignUp