import React, { useEffect, useState } from 'react';
import Amplify, { Analytics, Auth } from 'aws-amplify';
import awsconfigsclient from './common/aws-configs'
import messaging from '@react-native-firebase/messaging';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux'
import { View ,Image , StyleSheet} from 'react-native';
import store from './Redux/sagas/rootSaga'
import AppNavigation from "./Components/AppNavigation"
import { styles } from './Components/styles'

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
  const [viewSplash, setViewSplash] = useState(true)
  useEffect(() => {
    Auth.currentAuthenticatedUser()
        .then(user => {
            
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

  useEffect(()=>{
    setTimeout(() => {setViewSplash(false)}, 3000)
  },[])
  
  if(viewSplash){
    return (<View>
      <Image
        style={styles.loadingPage}
        source={require('./assets/splash.png')}
      />
    </View>)
  }
  return (
    <Provider store={store}>
      <AppNavigation isSignedin={isSignedin} userEmail={userEmail}/>
    </Provider>
  )
}
 export default App;