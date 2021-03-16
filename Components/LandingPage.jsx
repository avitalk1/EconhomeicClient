import * as React from 'react';
import { Button, View, Text, StyleSheet } from 'react-native';

function LandingPage({ navigation }) {
    const handeSignIn = () => {
        navigation.navigate('SIGNIN')
    }
    const handlePreSignUp = () => {
        navigation.navigate('PRESIGNUP')
    }
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
       </View>
    );
}


const styles = StyleSheet.create({
    container: {
      marginTop: 50
    }
  });
export default LandingPage