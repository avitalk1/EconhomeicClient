import React, { useEffect } from 'react';
import { connect } from 'react-redux'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Text } from 'react-native';
import { styles } from './styles';
import LandingPage from './LandingPage';
import SignIn from './SignIn'
import SignUp from './SignUp';
import MyTabs from './Navigation/BottomTabNavigator'
import { fetchUserData } from '../Redux/actions/UserDataActions/action';
import { changeIsSignedInStatus, changeIsSignedInEmail, changeIsNotification } from '../Redux/actions/IsSignedInActions/action';
const navigationRef = React.createRef();

function navigate(name, params) {
    navigationRef.current && navigationRef.current.navigate(name, params);
  }
const Stack = createStackNavigator();
const AppNavigation = (props) => {
    
    useEffect(() => {
        props.changeIsSignedInStatusFunc(props.isSignedin)
        props.changeIsSignedInEmailFunc(props.userEmail)
    }, [])
    useEffect(() => {
        if (props.isSignedInStatus.status == 1 && props.isSignedInStatus.status != "") {
            props.fetchUserDataFunc(props.isSignedInStatus.email)
        }
    }, [props.isSignedInStatus.email, props.isSignedInStatus.status])
    useEffect(()=>{
        if(props.isNotification != false){
            props.changeIsNotificationFunc(props.isNotification)
        }
    },[props.isNotification])

    return (
        <>
            { props.isSignedInStatus.status == 2 ? <></> :
                <>
                    <TouchableOpacity style={styles.topContainer}>
                        <Text style={styles.menuTitle}>EconHomeic</Text>
                    </TouchableOpacity>
                </>
            }
            <NavigationContainer ref={navigationRef}>
                {
                    props.isSignedInStatus.status == 2 ? (
                        <Stack.Navigator
                            screenOptions={{
                                headerShown: false
                            }}>
                            <Stack.Screen name="LANDING_PAGE" component={LandingPage} />
                            <Stack.Screen name="SIGNIN" component={SignIn} />
                            <Stack.Screen name="SIGNUP" component={SignUp} />
                        </Stack.Navigator>
                    ) : (
                        <MyTabs navigate={navigate}/>
                    )
                }
            </NavigationContainer>
        </>
    )
}
const mapStateToProps = (store) => ({
    isSignedInStatus: store.isSignedIn
});
const mapDispatchToProps = (dispatch) => ({
    fetchUserDataFunc: (email) => dispatch(fetchUserData(email)),
    changeIsSignedInStatusFunc: (status) => dispatch(changeIsSignedInStatus(status)),
    changeIsSignedInEmailFunc: (email) => dispatch(changeIsSignedInEmail(email)), 
    changeIsNotificationFunc: (notificationId) => dispatch(changeIsNotification(notificationId))
})
export default connect(mapStateToProps, mapDispatchToProps)(AppNavigation);
