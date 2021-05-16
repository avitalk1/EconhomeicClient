import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler'
import Amplify, { Analytics, Auth } from 'aws-amplify';
import awsconfigsclient from './common/aws-configs'
import messaging from '@react-native-firebase/messaging';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux'
import store from './Redux/sagas/rootSaga'
import { styles } from './Components/styles';
import LandingPage from './Components/LandingPage';
import SignIn from './Components/SignIn'
import SignUp from './Components/SignUp';
import PreSignUp from './Components/PreSignUp';
import SignupConfirmation from './Components/SignupConfirmation';
import UserForm from './Components/UserForm';
import HomePage from './Components/HomePage';
import MainStatisticsPageTesting from './Components/StatisticsComponents/MainStatisticsPageTesting';
import NotificationList from './Components/Notifications/NotificationList'
import LeftMenu from './Components/LeftMenu';
import InitRouting from './Components/InitRouting';
import MyTabs from './Components/Navigation/BottomTabNavigator'
import { handleDeivceForNotifications } from './common/api'
import AppNavigation from "./Components/AppNavigation"
Analytics.record({ name: "EconhomeicVisit" })
Amplify.configure(awsconfigsclient);
const Stack = createStackNavigator();
const navigationRef = React.createRef();

// function navigate(name, params) {
//   navigationRef.current && navigationRef.current.navigate(name, params);
// }

function App() {
  const [isSignedin, setIsSignedin] = useState(0)
  const [userEmail, setUserEmail] = useState("")
  // const [isMenuOpen, setIsMenuOpen] = useState(false)
  useEffect(() => {
    Auth.currentAuthenticatedUser()
        .then(user => {
            // handleDeivceForNotifications(user.attributes.email, "check")
            setUserEmail(user.attributes.email)
            setIsSignedin(1)
        })
        .catch((err) => {
          console.log("error")
          setIsSignedin(2)
        });
  }, [])
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
  if(isSignedin == 0){
    return (<View>
      <Text>Loading...</Text>
    </View>)
  }
  return (
    <Provider store={store}>
      <AppNavigation isSignedin={isSignedin} userEmail={userEmail}/>
    </Provider>
  )
}


 export default App;