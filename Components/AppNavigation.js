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

const MainStack = createStackNavigator();

const AppNavigation = () => {
    return (
            <MainStack.Navigator 
            initialRouteName="LANDING_PAGE"
            screenOptions={{
                headerShown: false
              }}
            >
                <MainStack.Screen name="LANDING_PAGE" component={LandingPage}/>
                <MainStack.Screen name="SIGNIN" component={SignIn}/>
                <MainStack.Screen name="PRESIGNUP" component={PreSignUp}/>
                <MainStack.Screen name="SIGNUP" component={SignUp}/>
                <MainStack.Screen name="SUCONFIRM" component={SignupConfirmation}/>
                <MainStack.Screen name="USERFORM" component={UserForm}/>
                <MainStack.Screen name="HOMEPAGE" component={HomePage}/>
                <MainStack.Screen name="MAIN_STATISTICS_PAGE" component={MainStatisticsPage}/>
            </MainStack.Navigator>
    )
}

export default AppNavigation
