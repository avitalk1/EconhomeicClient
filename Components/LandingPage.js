import React, { useEffect } from 'react';
import { Button, View, Text, StyleSheet } from 'react-native';
import Amplify , { Auth}from 'aws-amplify';
import awsconfigsclient from '../common/aws-configs'
import {handleDeivceForNotifications} from '../common/api'
import Logout from './Logout';
Amplify.configure(awsconfigsclient);
function LandingPage({ navigation }) {

    const handeSignIn = () => {
        navigation.navigate('SIGNIN')
    }
    const handlePreSignUp = () => {
        navigation.navigate('PRESIGNUP')
    }
    useEffect(() => {
         Auth.currentAuthenticatedUser()
        .then(user => {
            handleDeivceForNotifications(user.attributes.email, "check")
            navigation.navigate('MAIN_STATISTICS_PAGE',{
                userInfo: user.attributes.email, 
            })
        })
        .catch(err => console.log(err));
    },[])

    return (
       <View style={styles.container}>
           <Text>Welcome</Text>
           <View>
               <Button
                title="Sign In"
                onPress={handeSignIn}
               />
           </View>
           <Text>OR</Text>
           <View>
               <Button
                title="Sign Up"
                onPress={handlePreSignUp}
               />
           </View>
           <Logout/>
       </View>
    );
}


const styles = StyleSheet.create({
    container: {
      marginTop: 50
    }
  });
export default LandingPage