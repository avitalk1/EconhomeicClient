import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import MainStatisticsPage from '../StatisticsComponents/MainStatisticsPage'
import NotificationList from '../Notifications/NotificationList'
import { fetchUserData } from '../../Redux/actions/UserDataActions/action';
import Amplify, { Auth } from 'aws-amplify';
import { connect } from 'react-redux'
import awsconfigsclient from '../../common/aws-configs'


const Tab = createBottomTabNavigator();

function MyTabs() {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <Tab.Screen
                name="MAIN_STATISTICS_PAGE"
                component={MainStatisticsPage}
            />
            <Tab.Screen
                name="NOTIFICATION_LIST"
                component={NotificationList}
            />
        </Tab.Navigator>
    );
}


export default MyTabs;
