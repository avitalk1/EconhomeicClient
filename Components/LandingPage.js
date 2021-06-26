import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { styles } from './styles'
import Amplify from 'aws-amplify';
import awsconfigsclient from '../common/aws-configs'
import { Button } from 'react-native-elements';
Amplify.configure(awsconfigsclient);
function LandingPage(props) {

    const handeSignIn = () => {
        props.navigation.navigate('SIGNIN')
    }

    const handlePreSignUp = () => {
        props.navigation.navigate('SIGNUP')
    }
    
    return (
        <View>
            <View style={[{ flexDirection: 'row', alignItems: 'center' }]}>
                <View style={styles.triangleCorner} />
                <View style={styles.triangleCornerTopRight} />
            </View>
            <View style={styles.container}>
                <Text style={styles.welcomeText} >Welcome to Econhomeic</Text>
                <View style={styles.buttonContainer}>
                    <Button
                        title="Sign In"
                        onPress={handeSignIn}
                        buttonStyle={styles.button} 
                    />
                </View>
                <Text style={styles.OrText}>OR</Text>
                <View style={styles.buttonContainer}>
                    <Button
                        buttonStyle={styles.button}
                        title="Sign Up"
                        onPress={handlePreSignUp}
                    />
                </View>
            </View>
        </View>
    );
}

export default LandingPage