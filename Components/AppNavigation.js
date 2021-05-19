import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux'
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Text } from 'react-native';
import { styles } from './styles';
import LandingPage from './LandingPage';
import SignIn from './SignIn'
import SignUp from './SignUp';
import MyTabs from './Navigation/BottomTabNavigator'
import { fetchUserData } from '../Redux/actions/UserDataActions/action';

const navigationRef = React.createRef();

function navigate(name, params) {
    navigationRef.current && navigationRef.current.navigate(name, params);
}
const Stack = createStackNavigator();
const AppNavigation = (props) => {

    useEffect(() => {
        if (props.isSignedin == 1) {
            props.fetchUserDataFunc(props.userEmail)
        }
    }, [])


    return (
        <>
            { props.isSignedin == 2 ? <></> :
                <>
                    <TouchableOpacity style={styles.topContainer}>
                        <Text style={styles.menuTitle}>EconHomeic</Text>
                    </TouchableOpacity>
                </>
            }

            <NavigationContainer>

                
                    {
                    props.isSignedin == 2 ? (
                            <Stack.Navigator
                                screenOptions={{
                                    headerShown: false
                                }}>
                                <Stack.Screen name="LANDING_PAGE" component={LandingPage} />
                                <Stack.Screen name="SIGNIN" component={SignIn} />
                                <Stack.Screen name="SIGNUP" component={SignUp} />
                                </Stack.Navigator>
                        ) : (
                                <MyTabs/>
                        )
                    }

        </NavigationContainer>
        </>
    )
}

const mapDispatchToProps = (dispatch) => ({
    fetchUserDataFunc: (email) => dispatch(fetchUserData(email))
})
export default connect(null, mapDispatchToProps)(AppNavigation);
