import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux'
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity } from 'react-native-gesture-handler'
import { StyleSheet, Text, View } from 'react-native';
import { styles } from './styles';
import LandingPage from './LandingPage';
import SignIn from './SignIn'
import SignUp from './SignUp';
import PreSignUp from './PreSignUp';
import SignupConfirmation from './SignupConfirmation';
import UserForm from './UserForm';
import HomePage from './HomePage';
import LeftMenu from './LeftMenu';
// import MainStatisticsPage from './StatisticsComponents/MainStatisticsPage';
import MyTabs from './Navigation/BottomTabNavigator'
import { fetchUserData } from '../Redux/actions/UserDataActions/action';

const navigationRef = React.createRef();

function navigate(name, params) {
  navigationRef.current && navigationRef.current.navigate(name, params);
}
const Stack = createStackNavigator();
const AppNavigation = (props) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    useEffect(() => {
        if(props.isSignedin == 1){
            props.fetchUserDataFunc(props.userEmail)
        }
    }, [])
    const handleOpenMenuFunction = () => {
        console.log("hi")
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
          <TouchableOpacity style={styles.topContainer} onPress={handleOpenMenuFunction}>
            <View style={styles.menuIconContainer}>
                <Text style={styles.menuIcon}>||||</Text>
                <Text style={styles.menuTitle}>EconHomeic</Text>
            </View>
          </TouchableOpacity>
          :
          <LeftMenu handleCloseMenu={handleCloseMenuFunction} handleLogoutAction={handleLogoutActionFunction} navigation={navigate}/>
      }
        <NavigationContainer>
            <Stack.Navigator
                    screenOptions={{
                        headerShown: false
              }}
            >
                {
                    props.isSignedin == 2 ? (
                        <>
                            <Stack.Screen name="LANDING_PAGE" component={LandingPage} />
                            <Stack.Screen name="SIGNIN" component={SignIn} />
                            <Stack.Screen name="SIGNUP" component={SignUp} />
                        </>
                    ) : (
                        <>
                            <Stack.Screen name="MAIN_STATISTICS_PAGE" component={MyTabs}/>
                            <Stack.Screen name="HOMEPAGE" component={HomePage} />
                        </>
                    )
                }
            </Stack.Navigator>
        </NavigationContainer>
        </>
    )
}

const mapDispatchToProps = (dispatch) => ({
    fetchUserDataFunc: (email) => dispatch(fetchUserData(email))
})
export default connect(null, mapDispatchToProps)(AppNavigation);
