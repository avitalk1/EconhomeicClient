import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Amplify, { Auth } from 'aws-amplify';
import awsconfigsclient from '../common/aws-configs'
import { handleDeivceForNotifications } from '../common/api'
import { Button } from 'react-native-elements';
Amplify.configure(awsconfigsclient);
function LandingPage(props) {

    const handeSignIn = () => {
        props.navigation.navigate('SIGNIN')
    }

    const handlePreSignUp = () => {
        props.navigation.navigate('PRESIGNUP')
    }

    return (
        <View style={styles.container}>
            <Text style={styles.welcomeText} >Welcome to Econhomeic</Text>
            <View style={styles.buttonContainer}>
                <Button
                    title="Sign In"
                    onPress={handeSignIn}
                />
            </View>
            <Text  style={styles.OrText}>OR</Text>
            <View style={styles.buttonContainer}>
                <Button
                    title="Sign Up"
                    onPress={handlePreSignUp}
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
        height: "100%"
    },
    welcomeText: {
        fontSize:24,
        marginBottom:50
    }, 
    OrText:{
        fontSize:20,
        marginBottom:20, 
        marginTop:20
    }, 
    buttonContainer:{
        width:"80%"
    }
});
export default LandingPage