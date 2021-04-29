import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler'
import Amplify, { Analytics, Auth } from 'aws-amplify';
import awsconfigsclient from './common/aws-configs'
import messaging from '@react-native-firebase/messaging';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { Button } from 'react-native-elements';

import LandingPage from './Components/LandingPage';
import SignIn from './Components/SignIn'
import SignUp from './Components/SignUp';
import PreSignUp from './Components/PreSignUp';
import SignupConfirmation from './Components/SignupConfirmation';
import UserForm from './Components/UserForm';
import HomePage from './Components/HomePage';
import MainStatisticsPage from './Components/StatisticsComponents/MainStatisticsPage';
import NotificationList from './Components/Notifications/NotificationList'
import LeftMenu from './Components/LeftMenu';
Analytics.record({ name: "EconhomeicVisit" })
Amplify.configure(awsconfigsclient);
const Stack = createStackNavigator();
const navigationRef = React.createRef();

function navigate(name, params) {
  navigationRef.current && navigationRef.current.navigate(name, params);
}

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  useEffect(() => {
    // Assume a message-notification contains a "type" property in the data payload of the screen to open

    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log(
        'Notification caused app to open from background state:',
        remoteMessage,
      );
    });

    // Check whether an initial notification is available
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:',
            remoteMessage,
          );
        }
      });
  }, []);
  const handleOpenMenuFunction = () => {
    setIsMenuOpen(true)
  }
  const handleCloseMenuFunction = () => {
    setIsMenuOpen(false)
  }
  
  const handleLogoutActionFunction = () => {
    navigate('LANDING_PAGE')
  }
  return (
    <>

      {
        !isMenuOpen ?
          <TouchableOpacity onPress={handleOpenMenuFunction}>
            <View style={styles.menuIconContainer}>
                <Text style={styles.menuIcon}>||||</Text>
            </View>
          </TouchableOpacity>
          :
          <LeftMenu handleCloseMenu={handleCloseMenuFunction} handleLogoutAction={handleLogoutActionFunction} navigation={navigate}/>
      }

      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator
          initialRouteName="LANDING_PAGE"
          screenOptions={{
            headerShown: false
          }}
        >
          <Stack.Screen name="LANDING_PAGE" component={LandingPage} />
          <Stack.Screen name="SIGNIN" component={SignIn} />
          <Stack.Screen name="PRESIGNUP" component={PreSignUp} />
          <Stack.Screen name="SIGNUP" component={SignUp} />
          <Stack.Screen name="SUCONFIRM" component={SignupConfirmation} />
          <Stack.Screen name="USERFORM" component={UserForm} />
          <Stack.Screen name="HOMEPAGE" component={HomePage} />
          <Stack.Screen name="MAIN_STATISTICS_PAGE" component={MainStatisticsPage} />
          <Stack.Screen name="NOTIFICATION_LIST" component={NotificationList} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  )
}

const styles = StyleSheet.create({
  menuIconContainer: {
    width:30, 
    height:30, 
  
    display:'flex', 
    alignItems:'center', 
    justifyContent:'center',
  }, 
  menuIcon:{
    fontSize:20, 
    fontWeight:"bold"
  }
});

export default App
