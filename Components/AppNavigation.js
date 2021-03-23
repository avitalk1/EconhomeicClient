import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LandingPage from './LandingPage';
import SignIn from './SignIn'
import SignUp from './SignUp';
import PreSignUp from './PreSignUp';
import SignupConfirmation from './SignupConfirmation';
import UserForm from './UserForm';
import HomePage from './HomePage';
import MainStatisticsPage from './StatisticsComponents/MainStatisticsPage';

const Stack = createStackNavigator();

const AppNavigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator 
            initialRouteName="LANDING_PAGE"
            screenOptions={{
                headerShown: false
              }}
            >
                <Stack.Screen name="LANDING_PAGE" component={LandingPage}/>
                <Stack.Screen name="SIGNIN" component={SignIn}/>
                <Stack.Screen name="PRESIGNUP" component={PreSignUp}/>
                <Stack.Screen name="SIGNUP" component={SignUp}/>
                <Stack.Screen name="SUCONFIRM" component={SignupConfirmation}/>
                <Stack.Screen name="USERFORM" component={UserForm}/>
                <Stack.Screen name="HOMEPAGE" component={HomePage}/>
                <Stack.Screen name="MAIN_STATISTICS_PAGE" component={MainStatisticsPage}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default AppNavigation
